import { Product } from "../types/product";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

export function ProductList({ products, addToCart }: ProductListProps) {
  return (
    <div className="mb-5">
      <h5 className="mb-3">Produtos disponíveis:</h5>
      <div className="row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}