import { useContext } from 'react'
import { calculateDiscountedPrice } from '@/app/helpers'
import { Product } from '@/app/types/product'
import Image from 'next/image'
import { FavoritesContext } from '@/app/context/Favorites/FavoritesProvider'

interface FavoriteItemProps {
  favoriteItem: Product
}

export default function FavoriteItem({
  favoriteItem
}: FavoriteItemProps) {
  const { setFavorites } = useContext(FavoritesContext)

  // 1. Defesa principal: Se o item chegou vazio, não tenta renderizar
  if (!favoriteItem) return null;

  const removeFavorite = (id: string) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((item) => item?.id !== id)
    )
  }

  // 2. Optional Chaining (?.) para garantir que se a foto não existir, o app não quebre
  const imageSrc = favoriteItem.fotos?.[0]?.src || ''
  const imageAlt = favoriteItem.fotos?.[0]?.titulo || 'Produto sem imagem'

  return (
    <tr key={favoriteItem.id}>
      <td className='d-flex flex-row'>
        {/* Só exibe a imagem se ela tiver um caminho válido */}
        {imageSrc && (
          <Image
            className='rounded'
            src={imageSrc}
            alt={imageAlt}
            width={50}
            height={50}
          />
        )}
        <div className='d-flex flex-column ms-2'>
          <span className=''>{favoriteItem.nome}</span>
          <small className='text-muted'>{favoriteItem.descricao}</small>
        </div>
      </td>

      <td>
        R${' '}
        {calculateDiscountedPrice(
          Number(favoriteItem.preco || 0),
          favoriteItem.desconto || 0
        ).toFixed(2)}
      </td>

      <td>{favoriteItem.desconto}%</td>

      <td>
        <button
          onClick={() => removeFavorite(favoriteItem.id)}
          className='btn btn-outline-danger btn-sm'
        >
          Remover
        </button>
      </td>
    </tr>
  )
}