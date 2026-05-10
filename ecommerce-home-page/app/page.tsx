'use client'

import { useState } from 'react'
import { ProductCard } from '@/components/product-card'
import { CategorySidebar } from '@/components/category-sidebar'
import { ChatbotPopup } from '@/components/chatbot-popup'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter } from 'lucide-react'
import { addToCart } from '@/lib/cart'
import { PRODUCTS } from '@/lib/products'

const CATEGORIES = [
  { id: 'electronics', name: 'Điện tử', count: 24 },
  { id: 'fashion', name: 'Thời trang', count: 18 },
  { id: 'home', name: 'Nhà cửa', count: 15 },
  { id: 'beauty', name: 'Làm đẹp', count: 12 },
  { id: 'sports', name: 'Thể thao', count: 20 },
]

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchCategory =
      selectedCategory === '' ||
      product.category.toLowerCase().includes(selectedCategory.toLowerCase())
    const matchSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  const handleAddToCart = (productId: string) => {
    addToCart(productId)
    alert('Đã thêm sản phẩm vào giỏ hàng.')
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <CategorySidebar
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Filter Card */}
            <div className="mt-6 bg-sidebar border border-sidebar-border rounded-lg p-4 h-fit">
              <h3 className="font-bold text-foreground mb-4">Giá</h3>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    defaultChecked
                  />
                  <span className="text-foreground">Dưới 500k</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-foreground">500k - 1 triệu</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-foreground">1 triệu - 5 triệu</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-foreground">Trên 5 triệu</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-foreground font-semibold">
                Hiển thị {filteredProducts.length} sản phẩm
              </p>
              <select className="px-3 py-2 border border-border rounded-md text-sm bg-background text-foreground">
                <option>Sắp xếp: Mới nhất</option>
                <option>Giá: Thấp đến cao</option>
                <option>Giá: Cao đến thấp</option>
                <option>Bán chạy nhất</option>
              </select>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.image}
                    category={product.category}
                    onAddToCart={() => handleAddToCart(product.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Không tìm thấy sản phẩm phù hợp
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <ChatbotPopup />
    </main>
  )
}
