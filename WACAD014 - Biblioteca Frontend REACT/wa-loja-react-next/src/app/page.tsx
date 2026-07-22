"use client";

import { useState } from "react";
import { CartSummary } from "./components/CartSummary";
import { ProductList } from "./components/ProductList";
import { mockProducts } from "./mocks/products";
import { Product } from "./types/product";

export default function Home() {
  // Estados para controlar o carrinho
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Função para adicionar itens e atualizar o estado
  const addToCart = (product: Product) => {
    setTotalItems((prev) => prev + 1);
    setTotalPrice((prev) => prev + product.preco);
  };

  return (
    <div className="py-3">
      <CartSummary totalItems={totalItems} totalPrice={totalPrice} />
      <ProductList products={mockProducts} addToCart={addToCart} />
    </div>
  );
}