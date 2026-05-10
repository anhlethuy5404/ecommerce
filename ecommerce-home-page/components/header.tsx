"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getCartCount } from '@/lib/cart'

export default function Header() {
  const [user, setUser] = useState<string | null>(null)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const auth = localStorage.getItem('shophub_auth')
    if (auth) {
      try {
        const j = JSON.parse(auth)
        setUser(j.username || null)
      } catch (e) {
        setUser(null)
      }
    }
    setCartCount(getCartCount())

    const handleStorage = () => {
      setCartCount(getCartCount())
    }
    window.addEventListener('storage', handleStorage)
    window.addEventListener('cart:update', handleStorage)
    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('cart:update', handleStorage)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('shophub_auth')
    setUser(null)
    location.href = '/'
  }

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="text-2xl font-bold text-primary">ShopHub</Link>
          <div className="flex items-center gap-4">
            <Link href="/cart" className="text-sm text-muted-foreground">
              Giỏ hàng ({cartCount})
            </Link>
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm">{user}</span>
                <button onClick={logout} className="px-3 py-1 border rounded">Đăng xuất</button>
              </div>
            ) : (
              <Link href="/auth/login" className="px-3 py-1 border rounded text-sm">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>

        {/* keep search placeholder area for pages that render below */}
      </div>
    </header>
  )
}
