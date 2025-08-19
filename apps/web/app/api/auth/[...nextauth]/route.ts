import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import EmailProvider from 'next-auth/providers/email'
import { prisma } from '@/lib/prisma'
import { transporter } from '@/lib/mail'
import type { User as PrismaUser } from '@prisma/client'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'database' },
  providers: [
    EmailProvider({
      async sendVerificationRequest({ identifier, url }) {
        await transporter.sendMail({
          to: identifier,
          from: 'no-reply@nulladata.local',
          subject: 'Sign in to NullaData',
          text: `Sign in link: ${url}`,
          html: `<p>Sign in link: <a href="${url}">${url}</a></p>`,
        })
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, user }: { session: any; user: PrismaUser }) {
      if (session.user) {
        session.user.id = user.id
        session.user.role = user.role
      }
      return session
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: { token: any; user?: PrismaUser }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
  },
  events: {
    async signIn({ user }: { user: PrismaUser }) {
      await prisma.auditLog.create({
        data: {
          actorUserId: user.id,
          action: 'login',
          details: {},
        },
      })
    },
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = NextAuth(authOptions as any)

export { handler as GET, handler as POST }
