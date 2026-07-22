import { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export function ProductCard({ product, addToCart }: ProductCardProps) {
  // Pega a primeira foto, se não existir, usa o placeholder
  const imageUrl = product.fotos && product.fotos.length > 0 ? product.fotos[0] : "/placeholder.png";

  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 shadow-sm">
        <img 
          src={imageUrl} 
          className="card-img-top" 
          alt={product.nome} 
          style={{ objectFit: "cover", height: "200px" }} 
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.nome}</h5>
          <p className="card-text">R$ {product.preco.toFixed(2)}</p>
          <button 
            className="btn btn-dark mt-auto" 
            onClick={() => addToCart(product)}
          >
            Adicionar no carrinho
          </button>
        </div>
      </div>
    </div>
  );
}