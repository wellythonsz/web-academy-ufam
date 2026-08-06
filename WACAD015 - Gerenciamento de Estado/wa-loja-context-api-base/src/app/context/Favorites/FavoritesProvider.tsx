'use client'

import { createContext, ReactNode, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Product } from '@/app/types/product'
import { calculateDiscountedPrice } from '@/app/helpers'

// 1. Tipagem do Contexto atualizada com as variáveis de pending (loading)
interface FavoritesContextType {
  favorites: Product[]
  totalFavoritesValue: number
  addFavorite: (product: Product) => void
  removeFavorite: (id: string) => void
  checkIsFavorite: (id: string) => boolean
  isAddFavoritePending: boolean
  isRemoveFavoritePending: boolean
}

// Valores iniciais do contexto
export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  totalFavoritesValue: 0,
  addFavorite: () => {},
  removeFavorite: () => {},
  checkIsFavorite: () => false,
  isAddFavoritePending: false,
  isRemoveFavoritePending: false,
})

// Hook customizado
export function useFavoritesContext() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavoritesContext deve ser usado dentro de um FavoritesProvider')
  }
  return context
}

interface FavoritesProviderProps {
  children: ReactNode
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const queryClient = useQueryClient()

  // 2. BUSCAR DADOS (Query) - Recupera a lista do nosso JSON Server
  const { data: favorites = [] } = useQuery<Product[]>({
    queryKey: ['favorites'],
    queryFn: async () => {
      // O json-server vai rodar na porta 8000 para não conflitar com o Next (3000)
      const res = await fetch('http://localhost:8000/favorites')
      return res.json()
    },
  })

  // 3. ADICIONAR (Mutação) - Envia um novo favorito para a Fake API
  const addFavoriteMutation = useMutation({
    mutationFn: async (product: Product) => {
      const res = await fetch('http://localhost:8000/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })
      return res.json()
    },
    onSuccess: () => {
      // Se der certo, refaz a busca dos favoritos e avisa o usuário
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
      alert('Produto adicionado aos favoritos!')
    },
    onError: () => {
      alert('Erro ao adicionar produto aos favoritos.')
    },
  })

  // 4. REMOVER (Mutação) - Deleta o favorito da Fake API
  const removeFavoriteMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`http://localhost:8000/favorites/${id}`, {
        method: 'DELETE',
      })
    },
    onSuccess: () => {
      // Se der certo, refaz a busca dos favoritos e avisa o usuário
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
      alert('Produto removido dos favoritos!')
    },
    onError: () => {
      alert('Erro ao remover produto dos favoritos.')
    },
  })

  // Funções de manipulação que acionam as mutações
  const addFavorite = (product: Product) => {
    addFavoriteMutation.mutate(product)
  }

  const removeFavorite = (id: string) => {
    removeFavoriteMutation.mutate(id)
  }

  const checkIsFavorite = (id: string) => {
    return favorites.some((item) => item.id === id)
  }

  // Cálculo do valor total
  const totalFavoritesValue = favorites.reduce((acc, product) => {
    if (!product) return acc
    return acc + calculateDiscountedPrice(Number(product.preco || 0), product.desconto || 0)
  }, 0)

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        totalFavoritesValue,
        addFavorite,
        removeFavorite,
        checkIsFavorite,
        // Repassando os status das mutações para melhorar a UX se quiser usar loading nos botões
        isAddFavoritePending: addFavoriteMutation.isPending,
        isRemoveFavoritePending: removeFavoriteMutation.isPending,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}