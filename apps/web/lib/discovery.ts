import got from 'got'
import * as cheerio from 'cheerio'
import robotsParser from 'robots-parser'
import pLimit from 'p-limit'
import { URL } from 'url'

export type Severity = 'low' | 'med' | 'high'

export interface QueryConfig {
  patterns: string[]
  domains: string[]
  blocklist: string[]
  brokerDomains: string[]
  socialDomains: string[]
  userAgent?: string
  concurrency?: number
}

export type Profile = {
  user: { name?: string; email: string }
  aliases: string[]
  username?: string
}

const robotsCache = new Map<string, unknown>()
const defaultUA = 'NullaDataBot/1.0 (+https://nulladata.example/bot)'

export function buildQueries(profile: Profile, cfg: QueryConfig) {
  const keys = [
    profile.user.name,
    profile.user.email,
    profile.username,
    ...profile.aliases,
  ].filter(Boolean)
  const queries: string[] = []
  for (const key of keys) {
    for (const pattern of cfg.patterns) {
      queries.push(pattern.replace('%s', encodeURIComponent(String(key))))
    }
    for (const domain of cfg.domains) {
      const q = encodeURIComponent(String(key))
      queries.push(`https://duckduckgo.com/html/?q=${q}+site%3A${domain}`)
    }
  }
  return queries
}

async function isAllowed(url: string, ua: string) {
  try {
    const u = new URL(url)
    const base = `${u.protocol}//${u.host}`
    if (!robotsCache.has(base)) {
      const txt = await got(`${base}/robots.txt`).text()
      robotsCache.set(base, robotsParser(`${base}/robots.txt`, txt))
    }
    const robots = robotsCache.get(base) as {
      isAllowed(path: string, ua: string): boolean
    }
    return robots.isAllowed(url, ua)
  } catch {
    return false
  }
}

export interface RawFinding {
  url: string
  title?: string
  snippet?: string
}
export interface Finding extends RawFinding {
  domain: string
  severity: Severity
}

export function normalizeFindings(items: RawFinding[]) {
  const out: Finding[] = []
  for (const it of items) {
    try {
      const u = new URL(it.url)
      out.push({
        url: u.href,
        domain: u.hostname,
        title: it.title?.trim(),
        snippet: it.snippet?.trim(),
        severity: 'low',
      })
    } catch {
      /* ignore invalid */
    }
  }
  return out
}

export function dedupeFindings(items: Finding[]) {
  const seen = new Set<string>()
  return items.filter((f) => {
    if (seen.has(f.url)) return false
    seen.add(f.url)
    return true
  })
}

function classify(find: Finding, cfg: QueryConfig): Severity {
  if (cfg.brokerDomains.includes(find.domain)) return 'high'
  if (cfg.socialDomains.includes(find.domain)) return 'med'
  return 'low'
}

async function fetchQuery(q: string, cfg: QueryConfig) {
  const ua = cfg.userAgent || defaultUA
  if (!(await isAllowed(q, ua))) return [] as RawFinding[]
  const html = await got(q, { headers: { 'user-agent': ua } }).text()
  const $ = cheerio.load(html)
  const results: RawFinding[] = []
  $('a').each((_, el) => {
    const href = $(el).attr('href')
    if (!href) return
    if (cfg.blocklist.some((d) => href.includes(d))) return
    results.push({
      url: href,
      title: $(el).text(),
      snippet: $(el).attr('title'),
    })
  })
  return results
}

interface PrismaLike {
  scanFinding: {
    findFirst(args: unknown): Promise<unknown>
    update(args: unknown): Promise<unknown>
    create(args: unknown): Promise<unknown>
  }
  case: { findMany(args: unknown): Promise<unknown[]> }
  clientProfile: { findUnique(args: unknown): Promise<unknown> }
}

async function getPrisma(): Promise<PrismaLike> {
  const mod = await import('./prisma.js')
  return mod.prisma as unknown as PrismaLike
}

export async function runDiscovery(
  caseId: string,
  profile: Profile,
  cfg: QueryConfig
) {
  const queries = buildQueries(profile, cfg)
  const limit = pLimit(cfg.concurrency || 2)
  const raw: RawFinding[] = []
  await Promise.all(
    queries.map((q) =>
      limit(async () => {
        raw.push(...(await fetchQuery(q, cfg)))
      })
    )
  )
  let findings = normalizeFindings(raw)
  findings = dedupeFindings(findings)
  const prisma = await getPrisma()
  for (const f of findings) {
    f.severity = classify(f, cfg)
    const existing = (await prisma.scanFinding.findFirst({
      where: { caseId, url: f.url },
    })) as { id: string } | null
    if (existing) {
      await prisma.scanFinding.update({
        where: { id: existing.id },
        data: {
          lastSeenAt: new Date(),
          title: f.title,
          snippet: f.snippet,
          severity: f.severity,
        },
      })
    } else {
      await prisma.scanFinding.create({
        data: {
          caseId,
          url: f.url,
          domain: f.domain,
          title: f.title,
          snippet: f.snippet,
          severity: f.severity,
          firstSeenAt: new Date(),
          lastSeenAt: new Date(),
        },
      })
    }
  }
}

export async function scheduleDailyDiscovery() {
  const prisma = await getPrisma()
  const cases = (await prisma.case.findMany({
    where: { status: 'monitoring' },
  })) as { id: string; userId: string }[]
  for (const c of cases) {
    const profile = (await prisma.clientProfile.findUnique({
      where: { userId: c.userId },
      include: { user: true },
    })) as Profile | null
    if (profile) {
      await runDiscovery(c.id, profile, defaultConfig)
    }
  }
}

export const defaultConfig: QueryConfig = {
  patterns: ['https://duckduckgo.com/html/?q=%s'],
  domains: [],
  blocklist: [],
  brokerDomains: ['pipl.com', 'spokeo.com'],
  socialDomains: ['facebook.com', 'twitter.com'],
  userAgent: defaultUA,
  concurrency: 2,
}
