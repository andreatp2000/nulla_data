import fs from 'node:fs'
import path from 'node:path'
import Handlebars from 'handlebars'
import MarkdownIt from 'markdown-it'
import PDFDocument from 'pdfkit'
import { z } from 'zod'
import dayjs from 'dayjs'
import nodemailer from 'nodemailer'

export const createRequestSchema = z.object({
  kind: z.enum(['GDPR_ERASURE', 'CCPA_DELETE', 'DEINDEX']),
  targetUrl: z.string().url(),
  recipientEmail: z.string().email(),
  recipientName: z.string().optional(),
  notes: z.string().optional(),
  attachIdDoc: z.boolean().optional(),
})

export type CreateRequestInput = z.infer<typeof createRequestSchema>

export function computeDueAt() {
  return dayjs().add(30, 'day').toDate()
}

function templatePath(kind: CreateRequestInput['kind']) {
  switch (kind) {
    case 'GDPR_ERASURE':
      return path.join(process.cwd(), 'templates', 'gdpr', 'erasure.md')
    case 'CCPA_DELETE':
      return path.join(process.cwd(), 'templates', 'ccpa', 'delete.md')
    case 'DEINDEX':
      return path.join(process.cwd(), 'templates', 'deindex', 'search.md')
    default:
      throw new Error('Unknown request kind')
  }
}

export async function renderPdf(
  kind: CreateRequestInput['kind'],
  data: Record<string, unknown>
): Promise<Buffer> {
  const raw = await fs.promises.readFile(templatePath(kind), 'utf8')
  const tpl = Handlebars.compile(raw)
  const md = tpl(data)
  const html = new MarkdownIt().render(md)
  const text = html.replace(/<[^>]+>/g, '')
  const doc = new PDFDocument()
  const chunks: Buffer[] = []
  doc.on('data', (c) => chunks.push(c))
  doc.text(text)
  doc.end()
  await new Promise((resolve) => doc.on('end', resolve))
  return Buffer.concat(chunks)
}

export async function sendEmail(options: {
  to: string
  subject: string
  text: string
  attachments?: { filename: string; content: Buffer }[]
}) {
  const transport = nodemailer.createTransport({
    streamTransport: true,
    newline: 'unix',
    buffer: true,
  })
  await transport.sendMail({
    from: 'no-reply@nulla.local',
    to: options.to,
    subject: options.subject,
    text: options.text,
    attachments: options.attachments,
  })
}
