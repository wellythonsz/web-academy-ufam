import { CartItem as CartItemType } from "../types/cart";
import { CartItem } from "./CartItem";

interface CartListProps {
  items: CartItemType[];
  removeItemFromCart: (id: string) => void;
}

export function CartList({ items, removeItemFromCart }: CartListProps) {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-white">
        <h5 className="mb-0">Produtos selecionados</h5>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table mb-0 text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>Produto</th>
                <th>Valor Unitário</th>
                <th>Quantidade</th>
                <th>Valor Total</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <CartItem 
                  key={item.produto.id} 
                  item={item} 
                  removeItemFromCart={removeItemFromCart} 
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}