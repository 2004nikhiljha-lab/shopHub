import { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, Package, Shield, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import formatCurrency from "../utils/formatCurrency";
import API from "../services/api";
import Loader, { ProductSkeleton } from "../components/Loader";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch products from API
      const { data } = await API.get('/products');
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again later.');
      
      // Fallback to sample data if API fails
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  // Fallback sample product data (in case API fails)
  const fallbackProducts = [
    {
      _id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 328,
      discount: 20,
      inStock: true,
    },
    {
      _id: 2,
      name: "Smart Watch Series 5",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 512,
      discount: 25,
      inStock: true,
    },
    {
      _id: 3,
      name: "Premium Leather Wallet",
      price: 49.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop",
      rating: 4.3,
      reviews: 156,
      discount: null,
      inStock: true,
    },
    {
      _id: 4,
      name: "Portable Power Bank 20000mAh",
      price: 35.99,
      originalPrice: 49.99,
      image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 892,
      discount: 28,
      inStock: true,
    },
    {
      _id: 5,
      name: "Mechanical Gaming Keyboard",
      price: 129.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 445,
      discount: 28,
      inStock: false,
    },
    {
      _id: 6,
      name: "Wireless Gaming Mouse",
      price: 59.99,
      originalPrice: 79.99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      rating: 4.4,
      reviews: 267,
      discount: 25,
      inStock: true,
    },
    {
      _id: 7,
      name: "4K Ultra HD Webcam",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 198,
      discount: 25,
      inStock: true,
    },
    {
      _id: 8,
      name: "USB-C Hub 7-in-1 Adapter",
      price: 39.99,
      originalPrice: 59.99,
      image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop",
      rating: 4.2,
      reviews: 673,
      discount: 33,
      inStock: true,
    },
  ];

  const features = [
    { icon: Truck, title: "Free Shipping", description: `On orders over ${formatCurrency(50)}` },
    { icon: Shield, title: "Secure Payment", description: "100% secure transactions" },
    { icon: Package, title: "Easy Returns", description: "30-day return policy" },
    { icon: TrendingUp, title: "Best Prices", description: "Guaranteed low prices" },
  ];

  const categories = [
    {
      name: "Electronics",
      slug: "electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
    },
    {
      name: "Fashion",
      slug: "fashion",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
    },
    {
      name: "Home & Garden",
      slug: "home-garden",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop",
    },
    {
      name: "Sports",
      slug: "sports",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Welcome to ShopHub</h1>
          <p className="text-xl mb-8 text-blue-100">
            Discover amazing products at unbeatable prices.
          </p>
          <Link to="/products">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center gap-2">
              Shop Now <ArrowRight size={20} />
            </button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <feature.icon className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category.slug}`}
                className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link 
              to="/products" 
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View All <ArrowRight size={18} />
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">{error}</p>
              <button 
                onClick={fetchProducts}
                className="mt-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Loading State - Show Skeleton Loaders */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : (
            /* Product Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.length > 0 ? (
                products.slice(0, 8).map((product) => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No products available</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
