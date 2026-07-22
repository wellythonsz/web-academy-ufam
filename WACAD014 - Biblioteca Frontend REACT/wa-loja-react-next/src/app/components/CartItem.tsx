import { CartItem as CartItemType } from "../types/cart";

interface CartItemProps {
  item: CartItemType;
  removeItemFromCart: (id: string) => void;
}

export function CartItem({ item, removeItemFromCart }: CartItemProps) {
  const valorTotal = item.produto.preco * item.quantidade;

  return (
    <tr>
      <td>{item.produto.nome}</td>
      <td>R$ {item.produto.preco.toFixed(2)}</td>
      <td>{item.quantidade}</td>
      <td>R$ {valorTotal.toFixed(2)}</td>
      <td>
        <button 
          className="btn btn-danger btn-sm"
          onClick={() => removeItemFromCart(item.produto.id)}
        >
          Remover
        </button>
      </td>
    </tr>
  );
}