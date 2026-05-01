import { Link } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'
import { Product } from '../../data/products'
import { useCart } from '../../context/CartContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    })
  }

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        {/* Image */}
        <div className="relative bg-gray-100 h-64 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {product.inStock ? (
            <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
              In Stock
            </div>
          ) : (
            <div className="absolute top-3 right-3 bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Out of Stock
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <p className="text-secondary text-xs uppercase tracking-wider font-semibold mb-1">
            {product.category}
          </p>
          <h3 className="font-semibold text-dark text-sm mb-2 line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-xs text-secondary">({product.reviews})</span>
          </div>

          {/* Price and Button */}
          <div className="mt-auto pt-3 border-t border-accent flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="bg-primary hover:bg-dark disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors duration-200"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
