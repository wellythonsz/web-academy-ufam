import { CartItem } from "../types/cart";
import { mockProducts } from "./products";

export const mockCartItems: CartItem[] = [
  {
    produto: mockProducts[0], // Pegando o Notebook
    quantidade: 1,
  },
  {
    produto: mockProducts[3], // Pegando o Smartwatch
    quantidade: 2,
  }
];