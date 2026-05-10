'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Category {
  id: string
  name: string
  count: number
}

interface CategorySidebarProps {
  categories: Category[]
  selectedCategory?: string
  onSelectCategory?: (categoryId: string) => void
}

export function CategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategorySidebarProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="bg-sidebar border border-sidebar-border rounded-lg overflow-hidden h-fit sticky top-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-primary hover:bg-primary/90 text-white font-semibold transition-colors"
      >
        <span>Danh mục sản phẩm</span>
        <ChevronDown
          size={20}
          className={cn(
            'transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <nav className="p-4 space-y-2">
          <button
            onClick={() => onSelectCategory?.('')}
            className={cn(
              'w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200',
              selectedCategory === ''
                ? 'bg-accent text-accent-foreground'
                : 'hover:bg-secondary/50 text-sidebar-foreground'
            )}
          >
            Tất cả sản phẩm
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory?.(category.id)}
              className={cn(
                'w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-between',
                selectedCategory === category.id
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-secondary/50 text-sidebar-foreground'
              )}
            >
              <span>{category.name}</span>
              <span className="text-xs font-semibold opacity-75">
                ({category.count})
              </span>
            </button>
          ))}
        </nav>
      )}
    </div>
  )
}
