"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  // Função disparada ao enviar o formulário válido
  const onSubmit = (data: any) => {
    console.log("Dados de login submetidos:", data);
    
    // 1. Salva no navegador que o usuário está logado
    localStorage.setItem("wa-logado", "sim"); 
    
    // 2. Redireciona o usuário para a página inicial
    router.push("/");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Entrar</h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input 
              type="email" 
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              {...register("email", { required: "O e-mail é obrigatório" })} 
            />
            {errors.email && <div className="invalid-feedback">{String(errors.email.message)}</div>}
          </div>

          <div className="mb-4">
            <label className="form-label">Senha</label>
            <input 
              type="password" 
              className={`form-control ${errors.senha ? 'is-invalid' : ''}`}
              {...register("senha", { required: "A senha é obrigatória" })} 
            />
            {errors.senha && <div className="invalid-feedback">{String(errors.senha.message)}</div>}
          </div>

          <button type="submit" className="btn btn-dark w-100 mb-3">
            Entrar
          </button>
        </form>

        <div className="text-center">
          <span className="text-muted">Ainda não tem uma conta? </span>
          <Link href="/cadastro" className="text-decoration-none">
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}