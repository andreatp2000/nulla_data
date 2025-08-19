import { Queue, Worker, type Job } from 'bullmq'
import IORedis from 'ioredis'
import fs from 'node:fs'
import { prisma } from '../lib/prisma'
import { renderPdf, sendEmail } from '../lib/dsar'

const connection = new IORedis(
  process.env.REDIS_URL || 'redis://localhost:6379'
)

export const dsarQueue = new Queue('dsar:send', { connection })

export const dsarWorker = new Worker(
  'dsar:send',
  async (job: Job<{ requestId: string }>) => {
    const request = await prisma.request.findUnique({
      where: { id: job.data.requestId },
      include: { case: { include: { user: true } } },
    })
    if (!request) return
    const payload = request.payload as { targetUrl: string }
    const pdf = request.pdfPath
      ? await fs.promises.readFile(request.pdfPath)
      : await renderPdf(request.kind, {
          customer: {
            name: request.case.user.name,
            email: request.case.user.email,
          },
          target: { url: payload.targetUrl },
          legal: { basis: request.legalBasis },
          response: { windowDays: 30 },
          case: { id: request.caseId },
          recipientName: request.recipientName,
        })
    await sendEmail({
      to: request.recipientEmail,
      subject: 'DSAR Request',
      text: 'See attached',
      attachments: [{ filename: 'request.pdf', content: pdf }],
    })
    await prisma.request.update({
      where: { id: request.id },
      data: {
        status: 'sent',
        sentAt: new Date(),
        sentVia: 'EMAIL',
      },
    })
    await prisma.auditLog.create({
      data: {
        caseId: request.caseId,
        action: 'REQUEST_SEND',
        details: { requestId: request.id },
      },
    })
  },
  { connection }
)
