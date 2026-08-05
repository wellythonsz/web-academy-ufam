import { Product } from "../types/product";
import { useMutation } from "@tanstack/react-query";
import { favoriteApi } from "../services/api";
import { toast } from "react-toastify";

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export function ProductCard({ product, addToCart }: ProductCardProps) {
  const imageUrl = product.fotos && product.fotos.length > 0 ? (product.fotos[0] as any).src : "/placeholder.png";  // Configuração da mutação para o POST de favoritos
  const { mutate: favoritarProduto } = useMutation({
    mutationFn: async (novoFavorito: Product) => {
      // Fazendo um POST no endpoint /favoritos
      const response = await favoriteApi.post("/favoritos", novoFavorito);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Produto favoritado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao favoritar o produto.");
    }
  });

  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 shadow-sm">
        <img 
          src={imageUrl as any} 
          className="card-img-top" 
          alt={product.nome} 
          style={{ objectFit: "cover", height: "200px" }} 
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.nome}</h5>
          <p className="card-text">R$ {Number(product.preco).toFixed(2)}</p>
          <button 
            className="btn btn-dark mt-auto mb-2" 
            onClick={() => addToCart(product)}
          >
            Adicionar no carrinho
          </button>
          <button 
            className="btn btn-outline-secondary w-100" 
            onClick={() => favoritarProduto(product)}
          >
            Favoritar
          </button>
        </div>
      </div>
    </div>
  );
}