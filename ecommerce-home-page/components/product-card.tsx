'use client'

import Link from 'next/link'
import { Heart, ShoppingCart } from 'lucide-react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { formatCurrency } from '@/lib/format'

interface ProductCardProps {
  id: string
  title: string
  price: number
  image: string
  category: string
  onAddToCart?: () => void
}

export function ProductCard({
  id,
  title,
  price,
  image,
  category,
  onAddToCart,
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative h-48 bg-secondary/20 overflow-hidden flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
          <Heart size={18} className="text-accent" />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
          {category}
        </p>
        <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-2">
          {title}
        </h3>

        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-accent">
              {formatCurrency(price)}
            </span>
            <Button
              onClick={onAddToCart}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <ShoppingCart size={16} />
            </Button>
          </div>
          <Link
            href={`/product/${id}`}
            className="inline-block text-sm text-primary underline"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </Card>
  )
}
