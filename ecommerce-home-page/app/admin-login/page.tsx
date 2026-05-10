"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getAuth, setAuth } from '@/lib/auth'

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin123'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const auth = getAuth()
    if (auth?.role === 'admin') {
      router.replace('/admin-dashboard')
    }
  }, [router])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      setError('Tên đăng nhập hoặc mật khẩu admin không đúng.')
      return
    }

    setAuth({ username: ADMIN_USERNAME, role: 'admin' })
    router.push('/admin-dashboard')
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-primary mb-2">Admin Login</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Đường dẫn admin riêng — chỉ truy cập trực tiếp bằng link <code>/admin-login</code>.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Tên đăng nhập</label>
            <Input
              type="text"
              placeholder="admin"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Mật khẩu</label>
            <Input
              type="password"
              placeholder="admin123"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <Button type="submit" className="w-full">Đăng nhập admin</Button>
        </form>

        <div className="mt-6 text-sm text-muted-foreground">
          Quay lại{' '}
          <Link href="/" className="text-primary underline">
            trang chính
          </Link>
        </div>
      </div>
    </main>
  )
}
