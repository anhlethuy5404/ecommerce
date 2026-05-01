import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, LogOut, Home, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

export default function Header() {
  const { user, logout } = useAuth()
  const { items } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-white shadow-sm border-b border-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="font-bold text-lg text-primary hidden sm:inline">EcoShop</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6 text-sm">
            <Link
              to="/"
              className="text-dark hover:text-primary transition-colors flex items-center gap-1"
            >
              <Home size={18} />
              <span className="hidden sm:inline">Home</span>
            </Link>

            {user && (
              <button
                onClick={handleLogout}
                className="text-dark hover:text-primary transition-colors flex items-center gap-1"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}

            {!user && (
              <Link
                to="/login"
                className="text-dark hover:text-primary transition-colors flex items-center gap-1"
              >
                <User size={18} />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-dark hover:text-primary transition-colors flex items-center gap-1"
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Cart</span>
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {items.length}
                </span>
              )}
            </Link>
          </nav>

          {/* User Info */}
          {user && (
            <div className="ml-4 text-sm text-dark hidden sm:block">
              <p className="font-medium">{user.name}</p>
              <p className="text-secondary text-xs">{user.email}</p>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
