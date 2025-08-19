/* eslint-disable */
// @ts-nocheck
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Demo Admin',
      role: 'admin',
      clientProfile: {
        create: {
          aliases: ['demo'],
          city: 'Metropolis',
          consentFlags: {},
        },
      },
      cases: {
        create: {
          status: 'intake',
          progress: 0,
          targets: {
            create: [
              {
                domain: 'twitter.com',
                type: 'social',
                notes: 'Social profile',
              },
              {
                domain: 'broker-example.com',
                type: 'broker',
                notes: 'Data broker listing',
              },
              {
                domain: 'blog.example.com',
                type: 'blog',
                notes: 'Blog post mention',
              },
            ],
          },
        },
      },
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
