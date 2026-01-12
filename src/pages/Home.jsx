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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hero carousel images
  const heroImages = [
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&h=600&fit=crop", // Shopping bags
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&h=600&fit=crop", // Fashion store
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1920&h=600&fit=crop", // Electronics
    "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=1920&h=600&fit=crop", // Shopping experience
  ];

  // Rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('🔍 Fetching products from:', API.defaults.baseURL + '/products');
      
      // Fetch products from API
      const { data } = await API.get('/products');
      
      console.log('✅ Products fetched:', data);
      
      // Check if data is an array
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data.products && Array.isArray(data.products)) {
        // Sometimes API returns { products: [...] }
        setProducts(data.products);
      } else {
        console.warn('⚠️ Unexpected data format:', data);
        setProducts(fallbackProducts);
      }
    } catch (error) {
      console.error('❌ Error fetching products:', error);
      console.error('Error details:', error.response);
      setError('Failed to load products. Showing sample products.');
      
      // Fallback to sample data if API fails
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  // Fallback sample product data (in case API fails)
  const fallbackProducts = [
    {
      _id: "1",
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 328,
      discount: 20,
      stock: 50,
      category: "Electronics",
      description: "Premium wireless headphones with noise cancellation"
    },
    {
      _id: "2",
      name: "Smart Watch Series 5",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 512,
      discount: 25,
      stock: 30,
      category: "Electronics",
      description: "Advanced smartwatch with health tracking"
    },
    {
      _id: "3",
      name: "Premium Leather Wallet",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop",
      rating: 4.3,
      reviews: 156,
      stock: 100,
      category: "Fashion",
      description: "Genuine leather wallet with RFID protection"
    },
    {
      _id: "4",
      name: "Portable Power Bank 20000mAh",
      price: 35.99,
      originalPrice: 49.99,
      image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 892,
      discount: 28,
      stock: 200,
      category: "Electronics",
      description: "High capacity power bank with fast charging"
    },
    {
      _id: "5",
      name: "Mechanical Gaming Keyboard",
      price: 129.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 445,
      discount: 28,
      stock: 0,
      category: "Electronics",
      description: "RGB mechanical keyboard with custom switches"
    },
    {
      _id: "6",
      name: "Wireless Gaming Mouse",
      price: 59.99,
      originalPrice: 79.99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      rating: 4.4,
      reviews: 267,
      discount: 25,
      stock: 75,
      category: "Electronics",
      description: "Precision gaming mouse with programmable buttons"
    },
    {
      _id: "7",
      name: "4K Ultra HD Webcam",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 198,
      discount: 25,
      stock: 40,
      category: "Electronics",
      description: "Professional 4K webcam for streaming"
    },
    {
      _id: "8",
      name: "USB-C Hub 7-in-1 Adapter",
      price: 39.99,
      originalPrice: 59.99,
      image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop",
      rating: 4.2,
      reviews: 673,
      discount: 33,
      stock: 150,
      category: "Electronics",
      description: "Multi-port USB-C hub for laptops"
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
      {/* Enhanced Hero Section with Animated Background */}
      <section className="relative h-[600px] overflow-hidden">
        {/* Background Images Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Hero ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-purple-900/90"></div>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-6xl font-bold mb-4 animate-fade-in">
              Welcome to ShopHub
            </h1>
            <p className="text-2xl mb-8 text-blue-100 animate-fade-in-delay">
              Discover amazing products at unbeatable prices.
            </p>
            <div className="flex gap-4 animate-fade-in-delay-2">
              <Link to="/products">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Shop Now <ArrowRight size={20} />
                </button>
              </Link>
              <Link to="/products">
                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition flex items-center gap-2">
                  Explore Products
                </button>
              </Link>
            </div>
          </div>

          {/* Floating Product Cards Animation */}
          <div className="hidden lg:block absolute right-20 top-1/2 transform -translate-y-1/2">
            <div className="relative w-64 h-80">
              {[1, 2, 3].map((item, index) => (
                <div
                  key={index}
                  className="absolute bg-white rounded-lg shadow-2xl p-4 w-48 animate-float"
                  style={{
                    top: `${index * 60}px`,
                    right: `${index * 30}px`,
                    animationDelay: `${index * 0.3}s`,
                    zIndex: 3 - index,
                  }}
                >
                  <div className="w-full h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentImageIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4 group hover:scale-105 transition-transform">
              <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition">
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
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition">
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
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 group"
            >
              View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center justify-between">
              <p className="text-yellow-800 text-sm">{error}</p>
              <button 
                onClick={fetchProducts}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm px-4 py-2 rounded hover:bg-blue-50 transition"
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
                  <Package className="mx-auto text-gray-400 mb-4" size={64} />
                  <p className="text-gray-500 text-lg mb-2">No products available</p>
                  <button 
                    onClick={fetchProducts}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Refresh Products
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s backwards;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.6s backwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
