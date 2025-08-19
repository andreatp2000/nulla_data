import { Queue } from 'bullmq'
import { env } from '@nulladata/config'

export const exampleQueue = new Queue('example', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  connection: { url: env.REDIS_URL } as any,
})
