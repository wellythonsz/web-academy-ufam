import 'dotenv/config';
import { PrismaClient, User } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import bcrypt from 'bcryptjs';
import { CreateUsuarioDto, UpdateUsuarioDto } from './usuario.types';

// Configuração do adaptador exigida pelo Prisma v7
const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string);
const prisma = new PrismaClient({ adapter });

export const getAllUsuarios = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};

export const createUsuario = async (data: CreateUsuarioDto): Promise<User> => {
  const rounds = 10;
  const salt = await bcrypt.genSalt(rounds);
  const hash = await bcrypt.hash(data.senha, salt); // Ajustado para 'senha'

  return await prisma.user.create({
    data: {
      ...data,
      senha: hash, 
    },
  });
};

export const findUsuarioById = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { id } });
};

export const updateUsuario = async (id: string, data: UpdateUsuarioDto): Promise<User> => {
  const rounds = 10;
  const salt = await bcrypt.genSalt(rounds);
  const hash = await bcrypt.hash(data.senha, salt); // Ajustado para 'senha'

  return await prisma.user.update({
    where: { id },
    data: {
      ...data,
      senha: hash, 
    },
  });
};

export const deleteUsuario = async (id: string): Promise<User> => {
  return await prisma.user.delete({ where: { id } });
};