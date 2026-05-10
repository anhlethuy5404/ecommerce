import { Product } from './products'

export type CartItem = {
  id: string
  quantity: number
}

const STORAGE_KEY = 'shophub_cart'

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

export function setCart(items: CartItem[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  window.dispatchEvent(new Event('cart:update'))
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0)
}

export function addToCart(productId: string, quantity = 1) {
  const cart = getCart()
  const existing = cart.find((item) => item.id === productId)
  if (existing) {
    existing.quantity += quantity
  } else {
    cart.push({ id: productId, quantity })
  }
  setCart(cart)
  return cart
}

export function removeFromCart(productId: string) {
  const cart = getCart().filter((item) => item.id !== productId)
  setCart(cart)
  return cart
}

export function updateCartQuantity(productId: string, quantity: number) {
  const cart = getCart().map((item) =>
    item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item,
  )
  setCart(cart)
  return cart
}

export function clearCart() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STORAGE_KEY)
}

export function getCartDetails(products: Product[]) {
  const cart = getCart()
  return cart
    .map((item) => {
      const product = products.find((product) => product.id === item.id)
      if (!product) return null
      return { ...product, quantity: item.quantity }
    })
    .filter(Boolean) as Array<Product & { quantity: number }>
}

export function getCartTotal(products: Product[]) {
  return getCartDetails(products).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
}
