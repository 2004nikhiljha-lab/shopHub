import ProductCard from '../components/ProductCard';
import { Trophy } from 'lucide-react';

export default function Sports() {
  const products = [
    {
      id: 1,
      name: 'Professional Yoga Mat Premium',
      price: 39.99,
      originalPrice: 59.99,
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 1023,
      discount: 33,
      inStock: true
    },
    {
      id: 2,
      name: 'Adjustable Dumbbells Set',
      price: 149.99,
      originalPrice: 229.99,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 678,
      discount: 35,
      inStock: true
    },
    {
      id: 3,
      name: 'Running Shoes Ultra Boost',
      price: 129.99,
      originalPrice: 189.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 1534,
      discount: 32,
      inStock: true
    },
    {
      id: 4,
      name: 'Resistance Bands Set 5 Levels',
      price: 24.99,
      originalPrice: 39.99,
      image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&h=500&fit=crop',
      rating: 4.6,
      reviews: 845,
      discount: 38,
      inStock: true
    },
    {
      id: 5,
      name: 'Smart Fitness Watch Pro',
      price: 199.99,
      originalPrice: 299.99,
      image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 923,
      discount: 33,
      inStock: true
    },
    {
      id: 6,
      name: 'Compression Sports Wear Set',
      price: 79.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1556817411-58c45dd94e8c?w=500&h=500&fit=crop',
      rating: 4.5,
      reviews: 567,
      discount: 33,
      inStock: true
    },
    {
      id: 7,
      name: 'Professional Jump Rope',
      price: 19.99,
      originalPrice: 29.99,
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 445,
      discount: 33,
      inStock: true
    },
    {
      id: 8,
      name: 'Foam Roller Massage Therapy',
      price: 34.99,
      originalPrice: 54.99,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop',
      rating: 4.6,
      reviews: 723,
      discount: 36,
      inStock: true
    },
    {
      id: 9,
      name: 'Basketball Official Size',
      price: 44.99,
      originalPrice: 64.99,
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 534,
      discount: 31,
      inStock: true
    },
    {
      id: 10,
      name: 'Gym Bag Duffel Sports',
      price: 49.99,
      originalPrice: 79.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
      rating: 4.5,
      reviews: 389,
      discount: 38,
      inStock: true
    },
    {
      id: 11,
      name: 'Bicycle Helmet Safety Pro',
      price: 59.99,
      originalPrice: 89.99,
      image: 'https://images.unsplash.com/photo-1557246565-8a3d3ab5d7f6?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 612,
      discount: 33,
      inStock: true
    },
    {
      id: 12,
      name: 'Water Bottle Insulated 32oz',
      price: 29.99,
      originalPrice: 44.99,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop',
      rating: 4.6,
      reviews: 934,
      discount: 33,
      inStock: true
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-80 h-80 bg-yellow-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-orange-300 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="text-yellow-300" size={32} />
            <h1 className="text-5xl font-bold">Sports & Fitness</h1>
          </div>
          <p className="text-xl text-orange-100 max-w-2xl">
            Achieve your fitness goals with premium sports equipment and activewear. Train like a champion.
          </p>
          <div className="mt-8 flex gap-4">
            <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition">
              Shop Equipment
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition">
              View Deals
            </button>
          </div>
        </div>
      </section>

      {/* Category Tags */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3">
          {['All Sports', 'Gym & Fitness', 'Running', 'Yoga', 'Cycling', 'Swimming', 'Team Sports', 'Outdoor'].map((category) => (
            <button
              key={category}
              className="px-6 py-2 bg-white rounded-full shadow hover:shadow-md hover:bg-orange-50 transition font-medium text-gray-700"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">Sort by:</span>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option>Best Sellers</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Top Rated</option>
              <option>New Arrivals</option>
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