import { Queue, Worker } from 'bullmq'
import IORedis from 'ioredis'
import { runDiscovery, defaultConfig } from '../lib/discovery'
import { prisma as client } from '../lib/prisma'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prisma: any = client

const connection = new IORedis(
  process.env.REDIS_URL || 'redis://localhost:6379'
)
export const discoveryQueue = new Queue('discovery', { connection })

export async function enqueueDailyScans() {
  const cases = await prisma.case.findMany({ where: { status: 'monitoring' } })
  for (const c of cases) {
    await discoveryQueue.add(
      'scan',
      { caseId: c.id },
      { repeat: { every: 1000 * 60 * 60 * 24 } }
    )
  }
}

export const discoveryWorker = new Worker(
  'discovery',
  async (job) => {
    const c = await prisma.case.findUnique({
      where: { id: job.data.caseId },
      include: { user: true },
    })
    if (!c) return
    const profile = await prisma.clientProfile.findUnique({
      where: { userId: c.userId },
      include: { user: true },
    })
    if (!profile) return
    await runDiscovery(c.id, profile, defaultConfig)
  },
  { connection }
)
