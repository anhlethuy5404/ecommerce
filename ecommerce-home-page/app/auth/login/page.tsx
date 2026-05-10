"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getAuth, setAuth } from '@/lib/auth'

export default function AuthLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const auth = getAuth()
    if (auth?.role === 'user') {
      router.replace('/')
    }
  }, [router])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Vui lòng nhập tên đăng nhập và mật khẩu.')
      return
    }

    setAuth({ username: username.trim(), role: 'user' })
    router.push('/')
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-primary mb-2">Đăng nhập</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Đăng nhập tài khoản user để tiếp tục mua sắm.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Tên đăng nhập</label>
            <Input
              type="text"
              placeholder="Nguyễn Văn A"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Mật khẩu</label>
            <Input
              type="password"
              placeholder="********"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <Button type="submit" className="w-full">Đăng nhập</Button>
        </form>

        <div className="mt-6 text-sm text-muted-foreground">
          Chưa có tài khoản?{' '}
          <Link href="/auth/signup" className="text-primary underline">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </main>
  )
}
