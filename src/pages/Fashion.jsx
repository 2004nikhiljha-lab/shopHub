import ProductCard from '../components/ProductCard';
import { Sparkles } from 'lucide-react';

export default function Fashion() {
  const products = [
    {
      id: 1,
      name: 'Classic Denim Jacket',
      price: 89.99,
      originalPrice: 129.99,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop',
      rating: 4.6,
      reviews: 342,
      discount: 31,
      inStock: true
    },
    {
      id: 2,
      name: 'Designer Leather Handbag',
      price: 199.99,
      originalPrice: 299.99,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 567,
      discount: 33,
      inStock: true
    },
    {
      id: 3,
      name: 'Premium Cotton T-Shirt Pack',
      price: 49.99,
      originalPrice: 79.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      rating: 4.5,
      reviews: 823,
      discount: 38,
      inStock: true
    },
    {
      id: 4,
      name: 'Running Sneakers Sport Pro',
      price: 119.99,
      originalPrice: 179.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 1024,
      discount: 33,
      inStock: true
    },
    {
      id: 5,
      name: 'Elegant Evening Dress',
      price: 149.99,
      originalPrice: 229.99,
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 445,
      discount: 35,
      inStock: true
    },
    {
      id: 6,
      name: 'Slim Fit Dress Shirt',
      price: 59.99,
      originalPrice: 89.99,
      image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=500&h=500&fit=crop',
      rating: 4.4,
      reviews: 289,
      discount: 33,
      inStock: true
    },
    {
      id: 7,
      name: 'Aviator Sunglasses Classic',
      price: 79.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop',
      rating: 4.6,
      reviews: 534,
      discount: 33,
      inStock: true
    },
    {
      id: 8,
      name: 'Leather Belt Premium',
      price: 39.99,
      originalPrice: 59.99,
      image: 'https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=500&h=500&fit=crop',
      rating: 4.5,
      reviews: 267,
      discount: 33,
      inStock: true
    },
    {
      id: 9,
      name: 'Winter Wool Coat',
      price: 249.99,
      originalPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 378,
      discount: 38,
      inStock: true
    },
    {
      id: 10,
      name: 'Casual Chino Pants',
      price: 69.99,
      originalPrice: 99.99,
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop',
      rating: 4.4,
      reviews: 512,
      discount: 30,
      inStock: true
    },
    {
      id: 11,
      name: 'Silk Scarf Collection',
      price: 45.99,
      originalPrice: 69.99,
      image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 223,
      discount: 34,
      inStock: true
    },
    {
      id: 12,
      name: 'High-Waisted Jeans',
      price: 79.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=500&fit=crop',
      rating: 4.6,
      reviews: 689,
      discount: 33,
      inStock: true
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-64 h-64 bg-yellow-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-pink-300 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-yellow-300" size={32} />
            <h1 className="text-5xl font-bold">Fashion</h1>
          </div>
          <p className="text-xl text-purple-100 max-w-2xl">
            Step into style with our curated fashion collection. From casual wear to elegant outfits, express yourself.
          </p>
          <div className="mt-8 flex gap-4">
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition">
              Shop Collection
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition">
              New Arrivals
            </button>
          </div>
        </div>
      </section>

      {/* Category Tags */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3">
          {['All', 'Men', 'Women', 'Kids', 'Accessories', 'Shoes', 'Bags', 'Jewelry'].map((tag) => (
            <button
              key={tag}
              className="px-6 py-2 bg-white rounded-full shadow hover:shadow-md hover:bg-purple-50 transition font-medium text-gray-700"
            >
              {tag}
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
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Trending</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Best Sellers</option>
              <option>New Arrivals</option>
            </select>
          </div>
          <div className="text-gray-600">
            Showing <span className="font-semibold">{products.length}</span> items
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