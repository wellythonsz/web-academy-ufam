import 'dotenv/config';
import { PrismaClient, Compra } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string);
const prisma = new PrismaClient({ adapter });

export const salvarCompraBanco = async (usuarioId: string, carrinho: { produtoId: string, quantidade: number }[]): Promise<Compra> => {
  return await prisma.compra.create({
    data: {
      usuarioId,
      itens: {
        create: carrinho.map(item => ({
          produtoId: item.produtoId,
          quantidade: item.quantidade
        }))
      }
    }
  });
};