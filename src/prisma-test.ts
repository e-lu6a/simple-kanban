// in root folder, npx tsx prisma-test.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const boards = await prisma.board.findMany({
    include: {
      items: true,
    }
  })
  console.dir(boards, {depth: null});
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })