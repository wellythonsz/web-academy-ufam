export interface Product {
  id: string;
  nome: string;
  preco: number;
  descricao?: string; // Opcional
  fotos: string[];
}