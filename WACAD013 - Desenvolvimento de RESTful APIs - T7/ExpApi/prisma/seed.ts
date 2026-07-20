// @ts-nocheck
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { UserTypes } from '../src/resources/userType/userType.constants';

// Configuração do adaptador conforme a aula
const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

async function main() {
  return await prisma.userType.createMany({
    data: [
      { id: UserTypes.ADMIN, nome: "admin" },
      { id: UserTypes.CLIENT, nome: "client" },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });