'use client'

import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'
import type { Product } from '@/app/types/product'

// 1. Tipagem do Contexto transferida para cá
interface FavoritesContextType {
  favorites: Product[]
  setFavorites: Dispatch<SetStateAction<Product[]>>
}

// 2. Criação do contexto com os valores iniciais
export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  setFavorites: () => ({}) as any,
})

// Tipagem para receber os componentes filhos
interface FavoritesProviderProps {
  children: ReactNode
}

// 3. Criação do Componente Provider Personalizado
export function FavoritesProvider({ children }: FavoritesProviderProps) {
  // 4. Estado encapsulado dentro do Provider
  const [favorites, setFavorites] = useState<Product[]>([])

  return (
    // 5. Retornando o Provider com o value mantido em formato de objeto
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}