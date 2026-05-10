"use client"

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getCartDetails, getCartTotal, clearCart } from '@/lib/cart'
import { PRODUCTS } from '@/lib/products'
import { formatCurrency } from '@/lib/format'

const shippingOptions = [
  { id: 'standard', label: 'Giao tiêu chuẩn (2-3 ngày)', price: 0 },
  { id: 'express', label: 'Giao nhanh (1 ngày)', price: 50000 },
]

const paymentOptions = [
  { id: 'card', label: 'Thẻ tín dụng / thẻ ghi nợ' },
  { id: 'cod', label: 'Thanh toán khi nhận hàng (COD)' },
]

export default function CheckoutPage() {
  const router = useRouter()
  const [shipping, setShipping] = useState('standard')
  const [payment, setPayment] = useState('card')
  const [cartItems, setCartItems] = useState<ReturnType<typeof getCartDetails>>([])
  const [notes, setNotes] = useState('')

  useEffect(() => {
    setCartItems(getCartDetails(PRODUCTS))
  }, [])

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  )
  const shippingCost = shippingOptions.find((option) => option.id === shipping)?.price || 0
  const total = subtotal + shippingCost

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const order = {
      id: `DH-${Math.floor(Math.random() * 900000) + 100000}`,
      items: cartItems,
      subtotal,
      shippingMethod: shipping,
      shippingPrice: shippingCost,
      paymentMethod: payment,
      total,
      notes,
      createdAt: new Date().toISOString(),
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('shophub_last_order', JSON.stringify(order))
    }

    clearCart()
    router.push('/checkout/success')
  }

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-background px-4 py-8">
        <div className="max-w-3xl mx-auto rounded-3xl border border-border bg-white p-10 text-center shadow-sm">
          <p className="text-lg text-foreground mb-4">Giỏ hàng trống. Không thể thanh toán.</p>
          <Link href="/" className="text-primary underline">
            Quay lại mua sắm
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="rounded-3xl border border-border bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-primary mb-4">Thanh toán</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <section className="rounded-3xl border border-border bg-background p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Thông tin đơn hàng</h2>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b border-border/70 py-4 last:border-none">
                  <img src={item.image} alt={item.title} className="h-20 w-20 rounded-3xl object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.quantity} x {formatCurrency(item.price)}</p>
                  </div>
                  <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              ))}
            </section>

            <section className="rounded-3xl border border-border bg-background p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Chọn vận chuyển</h2>
              <div className="space-y-3">
                {shippingOptions.map((option) => (
                  <label key={option.id} className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 cursor-pointer">
                    <input
                      type="radio"
                      name="shipping"
                      value={option.id}
                      checked={shipping === option.id}
                      onChange={() => setShipping(option.id)}
                      className="h-4 w-4"
                    />
                    <div>
                      <p className="font-medium text-foreground">{option.label}</p>
                      <p className="text-sm text-muted-foreground">{option.price === 0 ? 'Miễn phí' : formatCurrency(option.price)}</p>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-background p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Phương thức thanh toán</h2>
              <div className="space-y-3">
                {paymentOptions.map((option) => (
                  <label key={option.id} className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value={option.id}
                      checked={payment === option.id}
                      onChange={() => setPayment(option.id)}
                      className="h-4 w-4"
                    />
                    <p className="font-medium text-foreground">{option.label}</p>
                  </label>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-background p-6">
              <label className="block text-sm font-medium text-foreground mb-2">Ghi chú cho đơn hàng</label>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className="w-full rounded-3xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none focus:border-ring focus:ring-ring/50"
                rows={4}
                placeholder="Yêu cầu giao hàng, ghi chú thêm..."
              />
            </section>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
              Xác nhận và thanh toán
            </Button>
          </form>
        </div>

        <aside className="rounded-3xl border border-border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-4">Tổng đơn hàng</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Tạm tính</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Phí vận chuyển</span>
              <span>{formatCurrency(shippingCost)}</span>
            </div>
            <div className="border-t border-border pt-4 flex items-center justify-between text-lg font-bold text-foreground">
              <span>Thành tiền</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
