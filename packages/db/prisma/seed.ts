import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
  const madhur = await prisma.user.upsert({
    where: { number: '9999999999' },
    update: {},
    create: {
      number: '9910422442',
      password: '9910422442',
      name: 'Madhur',
      email: 'madhur@gmail.com',
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "122",
          provider: "HDFC",
        },
        
      },
    },
  })
  const nakul = await prisma.user.upsert({
    where: { number: '9999999998' },
    update: {},
    create: {
      number: '9818940042',
      password: '9818940042',
      name: 'Nakul',
      email: 'nakul@gmail.com',
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "123",
          provider: "HDFC",
        },
      },
    },
  })
  console.log({ madhur, nakul })
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