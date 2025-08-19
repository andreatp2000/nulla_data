export const env = {
  DATABASE_URL: process.env.DATABASE_URL || '',
  REDIS_URL: process.env.REDIS_URL || '',
  MEILI_HOST: process.env.MEILI_HOST || '',
  MEILI_API_KEY: process.env.MEILI_API_KEY || '',
  SMTP_HOST: process.env.SMTP_HOST || '',
  SMTP_PORT: process.env.SMTP_PORT || '',
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  SMTP_FROM: process.env.SMTP_FROM || '',
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || '',
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || '',
  APP_BASE_URL: process.env.APP_BASE_URL || '',
}

export * from './normalize'
