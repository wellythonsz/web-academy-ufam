'use client'

import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuthContext } from '@/app/context/Auth/AuthProvider' // Importação do custom hook

type LoginFormInputs = {
  email: string
  password: string
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>()

  // Consumindo a função de login do nosso contexto
  const { login } = useAuthContext()

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    // Passamos o email do formulário para a função de login centralizada
    login(data.email)
  }

  return (
    <div className='col-12 col-md-8 d-flex justify-content-center align-items-center'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control form-control-lg'
            id='email'
            aria-describedby='email'
            {...register('email', { required: true })}
          />
          {errors.email && (
            <span className='text-danger'>Esse campo é obrigatório</span>
          )}
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Senha
          </label>
          <input
            type='password'
            className='form-control form-control-lg'
            id='password'
            {...register('password', { required: true, minLength: 6 })}
          />
          {errors.password?.type === 'required' && (
            <span className='text-danger'>Esse campo é obrigatório</span>
          )}

          {errors.password?.type === 'minLength' && (
            <span className='text-danger'>Minímo de 6 (seis) caracteres </span>
          )}
        </div>

        <div className='d-grid col-12'>
          <button type='submit' className='btn btn-success'>
            Entrar
          </button>
        </div>

        <div className='text-center mt-3'>
          <Link href='/register' className='btn btn-link'>
            não tenho cadastro
          </Link>
        </div>
      </form>
    </div>
  )
}