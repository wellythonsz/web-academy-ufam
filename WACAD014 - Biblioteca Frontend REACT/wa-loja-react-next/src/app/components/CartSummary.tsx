interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
}

export function CartSummary({ totalItems, totalPrice }: CartSummaryProps) {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Resumo do Carrinho</h5>
        <p className="card-text mb-1">Quantidade total: {totalItems}</p>
        <p className="card-text fw-bold">Valor total: R$ {totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}