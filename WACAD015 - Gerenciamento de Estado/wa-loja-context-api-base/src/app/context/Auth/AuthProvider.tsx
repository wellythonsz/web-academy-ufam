'use client'

import { createContext, useState, useEffect, ReactNode, useContext } from 'react'
import { useRouter } from 'next/navigation'

// Tipagem do contexto
interface AuthContextType {
  userEmail: string | null
  login: (email: string) => void
  logout: () => void
}

// Criação do contexto com valores iniciais
export const AuthContext = createContext<AuthContextType>({
  userEmail: null,
  login: () => {},
  logout: () => {},
})

// Custom Hook para facilitar o consumo
export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

// Componente Provider
export function AuthProvider({ children }: AuthProviderProps) {
  // a. Estado local inicializado com null
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const router = useRouter()

  // b. useEffect sem dependências para ler o localStorage ao carregar a aplicação
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUserEmail(storedUser)
    }
  }, [])

  // c. Função de login: salva no estado, no localStorage e redireciona
  const login = (email: string) => {
    setUserEmail(email)
    localStorage.setItem('user', email)
    router.push('/')
  }

  // d. Função de logout: limpa o estado e remove do localStorage
  const logout = () => {
    setUserEmail(null)
    localStorage.removeItem('user')
  }

  // e. Adiciona o estado e as funções ao "value" do Provider
  return (
    <AuthContext.Provider value={{ userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}