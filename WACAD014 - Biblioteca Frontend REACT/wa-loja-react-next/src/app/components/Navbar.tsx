"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const deslogar = () => {
    localStorage.removeItem("wa-logado"); // Remove o registro de login
    router.push("/login"); // Redireciona de volta para a tela de login
  };

  if (pathname === "/login" || pathname === "/cadastro") {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link href="/" className="navbar-brand">
          WA Loja
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Início
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/cart" className="nav-link">
                Carrinho
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/favorites" className="nav-link">
                Favoritos
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <span 
              className="navbar-text text-white" 
              style={{ cursor: "pointer" }}
              onClick={deslogar}
            >
              Sair
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}