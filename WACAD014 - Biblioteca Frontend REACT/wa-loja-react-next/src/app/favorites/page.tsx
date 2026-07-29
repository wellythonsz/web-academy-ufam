"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteApi } from "../services/api";
import { toast } from "react-toastify";
import { Product } from "../types/product"; // Verifique se o caminho do seu type está correto

export default function FavoritesPage() {
  // 1. Instancia o queryClient para podermos invalidar queries depois
  const queryClient = useQueryClient();

  // 2. Fetch dos favoritos (GET) usando useQuery
  const { data: favoritos, isLoading, isError } = useQuery({
    queryKey: ["favoritos"],
    queryFn: async (): Promise<Product[]> => {
      const response = await favoriteApi.get("/favoritos");
      return response.data;
    },
  });

  // 3. Mutação para deletar (DELETE) usando useMutation
  const { mutate: removerFavorito } = useMutation({
    mutationFn: async (id: string) => {
      await favoriteApi.delete(`/favoritos/${id}`);
    },
    onSuccess: () => {
      toast.success("Produto removido dos favoritos!");
      // 4. Invalida a query para forçar a listagem a se atualizar automaticamente
      queryClient.invalidateQueries({ queryKey: ["favoritos"] });
    },
    onError: () => {
      toast.error("Erro ao remover o produto.");
    },
  });

  // Tratamento de Loading e Erro
  if (isLoading) {
    return <div className="container mt-5"><h3>Carregando favoritos...</h3></div>;
  }

  if (isError) {
    return <div className="container mt-5"><h3>Erro ao carregar os favoritos.</h3></div>;
  }

  return (
    <main className="container mt-5">
      <div className="card shadow-sm p-4">
        <h3 className="mb-4">Produtos Favoritos</h3>
        
        {favoritos && favoritos.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Valor</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {favoritos.map((produto) => (
                <tr key={produto.id}>
                  <td className="align-middle">{produto.nome}</td>
                  <td className="align-middle">R$ {Number(produto.preco).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removerFavorito(produto.id)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Você ainda não possui produtos favoritos.</p>
        )}
      </div>
    </main>
  );
}