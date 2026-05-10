"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AuthIndexPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-primary mb-4">Đăng nhập hoặc đăng ký</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Chọn tài khoản người dùng để tiếp tục. Nếu bạn là admin, sử dụng đường dẫn admin riêng.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/auth/login" className="block">
            <Button asChild variant="default" className="w-full">
              <span>Đăng nhập</span>
            </Button>
          </Link>
          <Link href="/auth/signup" className="block">
            <Button asChild variant="secondary" className="w-full">
              <span>Đăng ký</span>
            </Button>
          </Link>
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-border bg-secondary/10 p-4 text-sm text-foreground">
          Đối với admin: truy cập trực tiếp <code className="break-all">/admin-login</code>. Không có liên kết công khai trên header.
        </div>
      </div>
    </main>
  )
}
