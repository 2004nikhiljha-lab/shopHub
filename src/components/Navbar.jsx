import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, Heart, LogOut, Package } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // User Info
  const userInfo = useSelector((state) => state.user?.userInfo);
  const isLoggedIn = !!userInfo;

  // Cart
  const cartItems = useSelector((state) => state.cart?.items || []);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Search
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // Categories
  const categories = [
    { name: "Electronics", path: "/category/electronics" },
    { name: "Fashion", path: "/category/fashion" },
    { name: "Home & Garden", path: "/category/home-garden" },
    { name: "Sports", path: "/category/sports" },
    { name: "Books", path: "/category/books" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between">
          <p>Free shipping on orders over ₹999</p>
          <div className="hidden md:flex gap-4 items-center">
            {isLoggedIn && userInfo.isAdmin && (
              <Link to="/admin" className="text-purple-400 hover:text-purple-300 font-medium">
                ⚡ Admin
              </Link>
            )}
            {isLoggedIn && <Link to="/myorders">My Orders</Link>}
            <Link to="/help">Help</Link>
            {!isLoggedIn ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="text-green-400 hover:text-green-300 font-medium flex items-center gap-1"
                >
                  <User size={16} /> {userInfo.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 font-medium flex items-center gap-1"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo & Hamburger */}
        <div className="flex items-center gap-2">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="text-2xl font-bold hover:text-blue-600">
            ShopHub
          </Link>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-2xl relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search products..."
            className="w-full px-4 py-2 pr-10 border rounded-lg"
          />
          <button
            onClick={handleSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <Search size={20} />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Link to="/wishlist" title="Wishlist" className="hidden md:block">
            <Heart size={24} className="hover:text-red-500 transition-colors" />
          </Link>
          
          {isLoggedIn && (
            <Link to="/myorders" title="My Orders">
              <Package size={24} className="text-blue-600 hover:text-blue-700 transition-colors" />
            </Link>
          )}

          {isLoggedIn ? (
            <Link to="/profile" title="Profile">
              <User size={24} className="text-green-600 hover:text-green-700 transition-colors" />
            </Link>
          ) : (
            <Link to="/login" title="Login">
              <User size={24} className="hover:text-blue-600 transition-colors" />
            </Link>
          )}

          <Link to="/cart" className="relative" title="Cart">
            <ShoppingCart size={24} className="hover:text-blue-600 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="hidden md:block bg-gray-50 border-t">
        <ul className="max-w-7xl mx-auto px-4 flex gap-8 py-3">
          {categories.map((cat) => (
            <li key={cat.name}>
              <Link to={cat.path} className="hover:text-blue-600 transition-colors">
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              className="w-full px-4 py-2 border rounded-lg mb-2"
            />
          </div>
          <ul className="px-4 py-2">
            {categories.map((cat) => (
              <li key={cat.name} className="border-b">
                <Link
                  to={cat.path}
                  className="block py-3 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
            {!isLoggedIn ? (
              <>
                <li className="border-b">
                  <Link
                    to="/login"
                    className="block py-3 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="block py-3 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                {userInfo.isAdmin && (
                  <li className="border-b">
                    <Link
                      to="/admin"
                      className="block py-3 text-purple-600 hover:text-purple-700 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      ⚡ Admin Dashboard
                    </Link>
                  </li>
                )}
                <li className="border-b">
                  <Link
                    to="/myorders"
                    className="block py-3 text-blue-600 hover:text-blue-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    📦 My Orders
                  </Link>
                </li>
                <li className="border-b">
                  <Link
                    to="/profile"
                    className="block py-3 text-green-600 hover:text-green-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    👤 {userInfo.name}'s Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left py-3 text-red-600 hover:text-red-700"
                  >
                    🚪 Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}