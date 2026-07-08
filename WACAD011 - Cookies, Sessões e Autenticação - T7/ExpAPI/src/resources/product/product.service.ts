import { PrismaClient, Product } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { CreateProductDto, UpdateProductDto } from './product.types';
import dotenv from 'dotenv';

// 1. Forçamos o carregamento do .env AQUI ANTES do Prisma tentar se conectar
dotenv.config();

// 2. Usamos o Adapter exigido pelo Prisma 7.8.0 passando a URL garantida
const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

export async function checkNameInUse(name: string): Promise<boolean> {
  const product = await prisma.product.findUnique({ where: { name } });
  return product !== null;
}

export async function getAllProducts(): Promise<Product[]> {
  return await prisma.product.findMany();
}

export async function createProduct(product: CreateProductDto): Promise<Product> {
  return await prisma.product.create({ data: product });
}

export async function getProduct(id: string): Promise<Product | null> {
  return await prisma.product.findUnique({ where: { id } });
}

export async function updateProduct(id: string, product: UpdateProductDto): Promise<Product> {
  return await prisma.product.update({ where: { id }, data: product });
}

export async function removeProduct(id: string): Promise<Product> {
  return await prisma.product.delete({ where: { id } });
}