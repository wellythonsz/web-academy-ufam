import { Product } from '@prisma/client';

export type CreateProductDto = Pick<Product, 'name' | 'price' | 'stock'>;
export type UpdateProductDto = Pick<Product, 'name' | 'price' | 'stock'>;