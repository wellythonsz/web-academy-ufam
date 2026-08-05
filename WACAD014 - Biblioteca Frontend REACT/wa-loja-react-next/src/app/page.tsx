"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "./services/api";
import { CartSummary } from "./components/CartSummary";
import { ProductList } from "./components/ProductList";
import { Product } from "./types/product";

export default function Home() {
  const router = useRouter();

  // Proteção de rota: redireciona para o login se não encontrar a flag "wa-logado"
  useEffect(() => {
    const usuarioLogado = localStorage.getItem("wa-logado");
    if (!usuarioLogado) {
      router.push("/login");
    }
  }, [router]);

  // Estados para controlar o carrinho
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // 1. Função que usa o Axios para buscar os dados reais na API
  const fetchProducts = async (): Promise<Product[]> => {
    const response = await productsApi.get('/produto');
    return response.data;
  };

  // 2. React Query gerenciando o estado da requisição automaticamente
  const { data: produtos, isLoading, isError } = useQuery({
    queryKey: ['produtos'],
    queryFn: fetchProducts,
  });

  // Função para adicionar itens e atualizar o estado
  const addToCart = (product: Product) => {
    setTotalItems((prev) => prev + 1);
    // Convertendo para Number, pois a API pode retornar o preço como string
    setTotalPrice((prev) => prev + Number(product.preco)); 
  };

  // 3. Tratamento nativo de Loading
  if (isLoading) {
    return (
      <div className="py-3">
        <CartSummary totalItems={totalItems} totalPrice={totalPrice} />
        <div className="container mt-4">
          <h3>Carregando produtos...</h3>
        </div>
      </div>
    );
  }

  // Tratamento nativo de Erro
  if (isError) {
    return (
      <div className="py-3">
        <CartSummary totalItems={totalItems} totalPrice={totalPrice} />
        <div className="container mt-4">
          <h3>Erro ao carregar os produtos.</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="py-3">
      <CartSummary totalItems={totalItems} totalPrice={totalPrice} />
      {/* Passando os produtos reais oriundos da API */}
      {produtos && <ProductList products={produtos} addToCart={addToCart} />}
    </div>
  );
}