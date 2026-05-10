"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { addToCart } from '@/lib/cart'
import { Product } from '@/lib/products'
import { formatCurrency } from '@/lib/format'
import { Button } from '@/components/ui/button'

export default function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)

  const handleAdd = () => {
    addToCart(product.id, quantity)
    router.push('/cart')
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
        <div className="rounded-3xl border border-border bg-white overflow-hidden shadow-sm">
          <img
            src={product.image}
            alt={product.title}
            className="w-full object-cover h-[520px]"
          />
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-white p-8 shadow-sm">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              {product.category}
            </p>
            <h1 className="text-3xl font-bold text-foreground mb-4">{product.title}</h1>
            <p className="text-2xl font-bold text-accent mb-6">{formatCurrency(product.price)}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 font-bold"
                >
                  -
                </button>
                <span className="w-10 text-center font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 font-bold"
                >
                  +
                </button>
              </div>
              <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90 text-white">
                Thêm vào giỏ hàng
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-foreground mb-2">Hỗ trợ giao hàng</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Miễn phí đổi trả trong 7 ngày</li>
              <li>Giao hàng nhanh trong 2-3 ngày</li>
              <li>Thanh toán khi nhận hàng hoặc thẻ</li>
            </ul>
          </div>

          <Link href="/" className="text-sm text-primary underline">
            ← Quay về trang sản phẩm
          </Link>
        </div>
      </div>
    </main>
  )
}
