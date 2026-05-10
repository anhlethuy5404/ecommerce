"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { getCartDetails, getCartTotal, removeFromCart, updateCartQuantity } from '@/lib/cart'
import { PRODUCTS } from '@/lib/products'
import { formatCurrency } from '@/lib/format'

export default function CartPage() {
  const router = useRouter()
  const [items, setItems] = useState<Array<ReturnType<typeof getCartDetails>[number]>>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setItems(getCartDetails(PRODUCTS))
    setTotal(getCartTotal(PRODUCTS))
  }, [])

  const refresh = () => {
    setItems(getCartDetails(PRODUCTS))
    setTotal(getCartTotal(PRODUCTS))
  }

  const changeQuantity = (id: string, value: number) => {
    updateCartQuantity(id, value)
    refresh()
  }

  const removeItem = (id: string) => {
    removeFromCart(id)
    refresh()
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="rounded-3xl border border-border bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">Giỏ hàng của bạn</h1>
              <p className="text-sm text-muted-foreground">Kiểm tra sản phẩm và đi tới thanh toán.</p>
            </div>
            <Button onClick={() => router.push('/checkout')} className="bg-primary hover:bg-primary/90 text-white">
              Thanh toán
            </Button>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-border bg-white p-10 text-center shadow-sm">
            <p className="text-lg text-foreground mb-4">Giỏ hàng đang trống.</p>
            <Link href="/" className="text-primary underline">
              Quay lại mua sắm
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col gap-4 border-b border-border pb-4 last:border-none last:pb-0">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.title} className="h-24 w-24 rounded-3xl object-cover" />
                    <div className="flex-1">
                      <Link href={`/product/${item.id}`} className="text-lg font-semibold text-foreground hover:text-primary">
                        {item.title}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">{item.category}</p>
                      <p className="mt-2 text-accent font-bold">{formatCurrency(item.price)}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2">
                      <button
                        type="button"
                        onClick={() => changeQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 font-bold"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-semibold">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => changeQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 font-bold"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">Thành tiền:</span>
                      <span className="font-semibold">{formatCurrency(item.price * item.quantity)}</span>
                      <button type="button" onClick={() => removeItem(item.id)} className="text-destructive underline">
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Tổng đơn hàng</h2>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Số sản phẩm</span>
                <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Phí vận chuyển</span>
                <span>Thỏa thuận khi thanh toán</span>
              </div>
              <div className="border-t border-border pt-4 flex items-center justify-between text-lg font-bold">
                <span>Tổng</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <Button onClick={() => router.push('/checkout')} className="w-full bg-primary hover:bg-primary/90 text-white">
                Đi tới thanh toán
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
