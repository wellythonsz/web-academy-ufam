"use client";

import { useState } from "react";
import { CartList } from "../components/CartList";
import { CartSummary } from "../components/CartSummary";
import { mockCartItems } from "../mocks/cartItems";

export default function CartPage() {
  // Inicializa o estado com o mock do carrinho
  const [cartItems, setCartItems] = useState(mockCartItems);

  // Função para remover item do estado baseado no ID
  const removeItemFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.produto.id !== id));
  };

  // Cálculos dinâmicos baseados no estado atual
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantidade, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.produto.preco * item.quantidade), 0);

  return (
    <div className="py-3">
      <CartList items={cartItems} removeItemFromCart={removeItemFromCart} />
      <CartSummary totalItems={totalItems} totalPrice={totalPrice} />
    </div>
  );
}