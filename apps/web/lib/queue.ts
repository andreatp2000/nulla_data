import { Queue, type RedisOptions } from 'bullmq'
import { env } from '@nulladata/config'

const redisUrl = new URL(env.REDIS_URL)

const connection: RedisOptions = {
  host: redisUrl.hostname,
  port: Number(redisUrl.port),
  ...(redisUrl.username ? { username: redisUrl.username } : {}),
  ...(redisUrl.password ? { password: redisUrl.password } : {}),
}

export const exampleQueue = new Queue('example', { connection })
