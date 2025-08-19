import { Queue, Worker } from 'bullmq'
import IORedis from 'ioredis'
import { prisma as client } from '../lib/prisma'
import { transporter } from '../lib/mail'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prisma: any = client
const connection = new IORedis(
  process.env.REDIS_URL || 'redis://localhost:6379'
)
export const dsarQueue = new Queue('dsar:send', { connection })

export const dsarWorker = new Worker(
  'dsar:send',
  async (job) => {
    const req = await prisma.request.findUnique({ where: { id: job.data.id } })
    if (!req) return
    try {
      await transporter.sendMail({
        to: req.recipientEmail,
        subject: 'Data request',
        text: 'Si veda allegato',
        attachments: req.pdfPath
          ? [{ filename: 'request.pdf', path: req.pdfPath }]
          : [],
      })
      await prisma.request.update({
        where: { id: req.id },
        data: { status: 'sent', sentAt: new Date(), sentVia: 'EMAIL' },
      })
      await prisma.auditLog.create({
        data: {
          caseId: req.caseId,
          action: 'REQUEST_SEND',
          details: { requestId: req.id },
        },
      })
    } catch (e) {
      await prisma.auditLog.create({
        data: {
          caseId: req.caseId,
          action: 'REQUEST_FAIL',
          details: { requestId: req.id, error: String(e) },
        },
      })
    }
  },
  { connection }
)
