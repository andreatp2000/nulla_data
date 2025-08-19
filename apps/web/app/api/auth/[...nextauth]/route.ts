import NextAuth, { NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { env } from '@nulladata/config'

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: {
        host: env.SMTP_HOST,
        port: Number(env.SMTP_PORT),
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        },
      },
      from: env.SMTP_FROM,
    }),
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
