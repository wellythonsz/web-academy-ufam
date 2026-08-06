import FavoriteItem from '../FavoriteItem/FavoriteItem'
import { useFavoritesContext } from '@/app/context/Favorites/FavoritesProvider'

export default function FavoritesList() {
  // Consumindo o estado e o valor total calculados no Provider através do custom hook
  const { favorites, totalFavoritesValue } = useFavoritesContext()

  return (
    <div className='card mb-4'>
      <div className='row card-body'>
        <h5 className='card-title mb-4 fw-bold'>Lista de favoritos:</h5>

        {favorites.length > 0 ? (
          <div className='table-responsive'>
            <table className='table table-borderless'>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Preço</th>
                  <th>Desconto</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                {favorites.map((item) => (
                  // A chave 'item' precisa ser passada exatamente assim
                  <FavoriteItem
                    key={item?.id || Math.random()}
                    favoriteItem={item}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Sua lista de favoritos está vazia.</p>
        )}
      </div>
      <div className='card-footer d-flex flex-column'>
        <small className='text-muted'>
          Quantidade de produtos: {favorites.length}
        </small>

        <small className='text-muted'>
          Valor total: R$ {totalFavoritesValue.toFixed(2)}
        </small>
      </div>
    </div>
  )
}