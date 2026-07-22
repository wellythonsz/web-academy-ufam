import Link from "next/link";

export function Navbar() {
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
          </ul>
          <div className="d-flex">
            <span className="navbar-text text-white" style={{ cursor: "pointer" }}>
              Sair
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}