'use client'

import Link from 'next/link'
import { useAuthContext } from '@/app/context/Auth/AuthProvider'

export default function Navbar() {
  // Consumindo o estado de email e a função logout do contexto
  const { userEmail, logout } = useAuthContext()

  return (
    <nav className='navbar navbar-expand-md bg-light border-bottom border-body sticky-top'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='/'>
          Loja WA
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarCollapse'
          aria-controls='navbarCollapse'
          aria-expanded='false'
          aria-label='Abrir menu'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarCollapse'>
          <ul className='navbar-nav me-auto mb-2 mb-md-0 '>
            <li className='nav-item'>
              <Link className='nav-link' href='/'>
                Início
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' href='/favorites'>
                Lista de Favoritos
              </Link>
            </li>
          </ul>

          <div className='d-flex align-items-center'>
            {/* Renderização condicional baseada no status de login */}
            {userEmail ? (
              <>
                <span className='me-3'>{userEmail}</span>
                <button 
                  type='button' 
                  className='btn btn-secondary' 
                  onClick={logout}
                >
                  Sair
                </button>
              </>
            ) : (
              <Link className='nav-link ' href='/login'>
                <button type='button' className='btn btn-secondary'>
                  Entrar
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}