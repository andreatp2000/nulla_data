import fs from 'node:fs/promises'
import path from 'node:path'
import Handlebars from 'handlebars'
import MarkdownIt from 'markdown-it'
import { createPdf } from './pdf'
import { z } from 'zod'
import dayjs from 'dayjs'

export const createRequestSchema = z.object({
  kind: z.enum(['GDPR_ERASURE', 'CCPA_DELETE', 'DEINDEX']),
  targetUrl: z.string().url(),
  recipientEmail: z.string().email(),
  recipientName: z.string().optional(),
  notes: z.string().optional(),
  attachIdDoc: z.boolean().optional(),
})

const md = new MarkdownIt()

export async function renderRequest(
  kind: string,
  data: Record<string, unknown>
) {
  const map: Record<string, string> = {
    GDPR_ERASURE: 'templates/gdpr/erasure.md',
    CCPA_DELETE: 'templates/ccpa/delete.md',
    DEINDEX: 'templates/deindex/search.md',
  }
  const file = map[kind]
  const tpl = await fs.readFile(path.join(process.cwd(), file), 'utf8')
  const compiled = Handlebars.compile(tpl)
  const mdText = compiled(data)
  const html = md.render(mdText)
  const text = html.replace(/<[^>]+>/g, '')
  return createPdf(text)
}

export function calcDueAt() {
  return dayjs().add(30, 'day').toDate()
}
