import { User } from '@prisma/client';

export type CreateUsuarioDto = Pick<User, 'nome' | 'email' | 'senha' | 'tipoUsuarioId'>;
export type UpdateUsuarioDto = Pick<User, 'nome' | 'email' | 'senha' | 'tipoUsuarioId'>;