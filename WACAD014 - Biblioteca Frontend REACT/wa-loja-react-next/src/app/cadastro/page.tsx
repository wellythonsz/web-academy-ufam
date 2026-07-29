"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CadastroPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = (data: any) => {
    console.log("Dados de cadastro submetidos:", data);
    toast.success("Cadastro realizado com sucesso!");
    router.push("/login");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: "450px" }}>
        <h2 className="text-center mb-4">Criar Conta</h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Nome Completo</label>
            <input 
              type="text" 
              className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
              {...register("nome", { required: "O nome é obrigatório" })} 
            />
            {errors.nome && <div className="invalid-feedback">{String(errors.nome.message)}</div>}
          </div>

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
              {...register("senha", { 
                required: "A senha é obrigatória",
                minLength: { value: 6, message: "A senha deve ter no mínimo 6 caracteres" }
              })} 
            />
            {errors.senha && <div className="invalid-feedback">{String(errors.senha.message)}</div>}
          </div>

          <button type="submit" className="btn btn-dark w-100 mb-3">
            Cadastrar
          </button>
        </form>

        <div className="text-center">
          <span className="text-muted">Já possui uma conta? </span>
          <Link href="/login" className="text-decoration-none">
            Fazer login
          </Link>
        </div>
      </div>
    </div>
  );
}