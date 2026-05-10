"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/format'

type Order = {
  id: string
  items: Array<{ id: string; title: string; price: number; quantity: number }>
  subtotal: number
  shippingMethod: string
  shippingPrice: number
  paymentMethod: string
  total: number
  notes: string
  createdAt: string
}

export default function SuccessPage() {
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const raw = window.localStorage.getItem('shophub_last_order')
    if (!raw) return
    try {
      setOrder(JSON.parse(raw) as Order)
    } catch {
      setOrder(null)
    }
  }, [])

  if (!order) {
    return (
      <main className="min-h-screen bg-background px-4 py-10">
        <div className="max-w-3xl mx-auto rounded-3xl border border-border bg-white p-10 text-center shadow-sm">
          <p className="text-lg text-foreground mb-4">Không tìm thấy đơn hàng.</p>
          <Link href="/" className="text-primary underline">
            Quay lại trang chủ
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-5xl mx-auto rounded-3xl border border-border bg-white p-10 shadow-sm">
        <div className="mb-8 text-center">
          <p className="text-3xl font-bold text-primary">Thanh toán thành công!</p>
          <p className="mt-2 text-muted-foreground">Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được ghi nhận.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div className="rounded-3xl border border-border bg-background p-6">
              <p className="text-sm text-muted-foreground">Mã đơn hàng</p>
              <p className="text-xl font-semibold text-foreground">{order.id}</p>
              <p className="mt-2 text-sm text-muted-foreground">Ngày tạo: {new Date(order.createdAt).toLocaleString()}</p>
            </div>

            <div className="rounded-3xl border border-border bg-background p-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">Chi tiết đơn hàng</h2>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">Số lượng: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-border bg-background p-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">Tóm tắt thanh toán</h2>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Tạm tính</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Phí vận chuyển</span>
                  <span>{formatCurrency(order.shippingPrice)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Phương thức thanh toán</span>
                  <span>{order.paymentMethod === 'cod' ? 'COD' : 'Thẻ'}</span>
                </div>
                <div className="pt-4 border-t border-border flex items-center justify-between font-semibold text-foreground">
                  <span>Tổng thanh toán</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>

            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white">
              <Link href="/">Quay về trang chủ</Link>
            </Button>
          </aside>
        </div>
      </div>
    </main>
  )
}
