import fs from 'node:fs'
import path from 'node:path'
import { z } from 'zod'

export interface DeindexConfig {
  engines: Record<string, { url: string; instructions: string }>
  contactOrigin: { instructions: string }
}

export function loadConfig(): DeindexConfig {
  const file = path.join(process.cwd(), 'config', 'deindex.json')
  const raw = fs.readFileSync(file, 'utf8')
  return JSON.parse(raw) as DeindexConfig
}

export const deindexRequestSchema = z.object({
  targetUrl: z.string().url(),
  legalBasis: z.string(),
})

export type DeindexRequestInput = z.infer<typeof deindexRequestSchema>

export function mapFindingToRequest(finding: { url: string }): DeindexRequestInput {
  return {
    targetUrl: finding.url,
    legalBasis: 'GDPR art.17',
  }
}

export function engineLink(engine: string): string | undefined {
  const cfg = loadConfig()
  return cfg.engines[engine]?.url
}
