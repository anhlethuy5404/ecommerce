export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-4">EcoShop</h3>
            <p className="text-secondary text-sm">
              Your trusted online marketplace for quality products.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-secondary">
              <li><a href="#" className="hover:text-accent transition">Books</a></li>
              <li><a href="#" className="hover:text-accent transition">Electronics</a></li>
              <li><a href="#" className="hover:text-accent transition">Fashion</a></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-secondary">
              <li><a href="#" className="hover:text-accent transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-accent transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary mt-8 pt-8 text-center text-sm text-secondary">
          <p>&copy; 2024 EcoShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
