import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed data if necessary
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    // @ts-expect-error - Prisma types may not include $disconnect
    await prisma.$disconnect()
  })
