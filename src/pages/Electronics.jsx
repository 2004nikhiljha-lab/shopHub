import ProductCard from '../components/ProductCard';
import { Zap } from 'lucide-react';

export default function Electronics() {
  const products = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones Pro',
      price: 129.99,
      originalPrice: 179.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 542,
      discount: 28,
      inStock: true
    },
    {
      id: 2,
      name: 'Smart Watch Fitness Tracker',
      price: 249.99,
      originalPrice: 349.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 831,
      discount: 29,
      inStock: true
    },
    {
      id: 3,
      name: '4K Action Camera Waterproof',
      price: 199.99,
      originalPrice: 299.99,
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop',
      rating: 4.6,
      reviews: 445,
      discount: 33,
      inStock: true
    },
    {
      id: 4,
      name: 'Portable Bluetooth Speaker',
      price: 79.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
      rating: 4.5,
      reviews: 672,
      discount: 33,
      inStock: true
    },
    {
      id: 5,
      name: 'Gaming Mechanical Keyboard RGB',
      price: 149.99,
      originalPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 1024,
      discount: 25,
      inStock: true
    },
    {
      id: 6,
      name: 'Wireless Gaming Mouse Pro',
      price: 69.99,
      originalPrice: 99.99,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 523,
      discount: 30,
      inStock: true
    },
    {
      id: 7,
      name: 'USB-C Docking Station Hub',
      price: 89.99,
      originalPrice: 129.99,
      image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
      rating: 4.4,
      reviews: 389,
      discount: 31,
      inStock: true
    },
    {
      id: 8,
      name: 'Portable Power Bank 30000mAh',
      price: 49.99,
      originalPrice: 79.99,
      image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
      rating: 4.6,
      reviews: 912,
      discount: 38,
      inStock: true
    },
    {
      id: 9,
      name: 'Noise Cancelling Earbuds Pro',
      price: 159.99,
      originalPrice: 229.99,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 1340,
      discount: 30,
      inStock: true
    },
    {
      id: 10,
      name: 'Laptop Cooling Pad RGB',
      price: 39.99,
      originalPrice: 59.99,
      image: 'https://images.unsplash.com/photo-1625225233503-ee976bde9b39?w=500&h=500&fit=crop',
      rating: 4.3,
      reviews: 267,
      discount: 33,
      inStock: true
    },
    {
      id: 11,
      name: 'Webcam 4K Ultra HD Streaming',
      price: 119.99,
      originalPrice: 169.99,
      image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 445,
      discount: 29,
      inStock: true
    },
    {
      id: 12,
      name: 'Digital Drawing Tablet Pro',
      price: 279.99,
      originalPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1616353071588-323dbcfa14d8?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 623,
      discount: 30,
      inStock: true
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="text-yellow-400" size={32} />
            <h1 className="text-5xl font-bold">Electronics</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl">
            Discover the latest in tech gadgets and electronics. From headphones to smart devices, find everything you need.
          </p>
          <div className="mt-8 flex gap-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
              Shop Now
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              View Deals
            </button>
          </div>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">Sort by:</span>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Highest Rated</option>
              <option>Newest</option>
            </select>
          </div>
          <div className="text-gray-600">
            Showing <span className="font-semibold">{products.length}</span> products
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}