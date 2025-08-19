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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (prisma as any).$disconnect()
  })
