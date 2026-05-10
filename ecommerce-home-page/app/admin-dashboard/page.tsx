"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { clearAuth, getAuth } from '@/lib/auth'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const auth = getAuth()
    if (!auth || auth.role !== 'admin') {
      router.replace('/admin-login')
      return
    }
    setUsername(auth.username)
  }, [router])

  const handleLogout = () => {
    clearAuth()
    router.push('/')
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl rounded-3xl border border-border bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Xin chào, {username || 'admin'}. Đây là trang admin riêng.
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Đăng xuất admin
          </Button>
        </div>

        <div className="rounded-2xl border border-border bg-secondary/10 p-6 text-sm text-foreground">
          <p className="mb-4">
            Admin không được điều hướng vào trang chính qua header user. Link này phải được truy cập trực tiếp.
          </p>
          <p className="text-muted-foreground">
            Nếu bạn muốn xem trang chính,{' '}
            <Link href="/" className="text-primary underline">
              quay lại đây
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  )
}
