import ProductCard from '../components/ProductCard';
import { BookOpen } from 'lucide-react';

export default function Books() {
  const products = [
    {
      id: 1,
      name: 'The Psychology of Money',
      price: 16.99,
      originalPrice: 24.99,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 2345,
      discount: 32,
      inStock: true
    },
    {
      id: 2,
      name: 'Atomic Habits',
      price: 14.99,
      originalPrice: 22.99,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 3456,
      discount: 35,
      inStock: true
    },
    {
      id: 3,
      name: 'Thinking, Fast and Slow',
      price: 18.99,
      originalPrice: 27.99,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 1823,
      discount: 32,
      inStock: true
    },
    {
      id: 4,
      name: 'The 7 Habits of Highly Effective People',
      price: 15.99,
      originalPrice: 23.99,
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 2134,
      discount: 33,
      inStock: true
    },
    {
      id: 5,
      name: 'Deep Work by Cal Newport',
      price: 16.99,
      originalPrice: 25.99,
      image: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 1567,
      discount: 35,
      inStock: true
    },
    {
      id: 6,
      name: 'Sapiens: A Brief History',
      price: 19.99,
      originalPrice: 29.99,
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 2890,
      discount: 33,
      inStock: true
    },
    {
      id: 7,
      name: 'The Lean Startup',
      price: 17.99,
      originalPrice: 26.99,
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&h=500&fit=crop',
      rating: 4.6,
      reviews: 1234,
      discount: 33,
      inStock: true
    },
    {
      id: 8,
      name: 'Rich Dad Poor Dad',
      price: 14.99,
      originalPrice: 21.99,
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 3123,
      discount: 32,
      inStock: true
    },
    {
      id: 9,
      name: 'The Power of Now',
      price: 13.99,
      originalPrice: 19.99,
      image: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 1789,
      discount: 30,
      inStock: true
    },
    {
      id: 10,
      name: 'Start With Why by Simon Sinek',
      price: 16.99,
      originalPrice: 24.99,
      image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 1456,
      discount: 32,
      inStock: true
    },
    {
      id: 11,
      name: 'The Alchemist by Paulo Coelho',
      price: 12.99,
      originalPrice: 18.99,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 4567,
      discount: 32,
      inStock: true
    },
    {
      id: 12,
      name: 'How to Win Friends and Influence People',
      price: 15.99,
      originalPrice: 22.99,
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 2678,
      discount: 30,
      inStock: true
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-80 h-80 bg-orange-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-yellow-200 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="text-yellow-200" size={32} />
            <h1 className="text-5xl font-bold">Books</h1>
          </div>
          <p className="text-xl text-amber-100 max-w-2xl">
            Discover knowledge and inspiration through our curated collection of bestsellers, classics, and hidden gems.
          </p>
          <div className="mt-8 flex gap-4">
            <button className="bg-white text-amber-700 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition">
              Browse Books
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-700 transition">
              Bestsellers
            </button>
          </div>
        </div>
      </section>

      {/* Genre Tags */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3">
          {['All Books', 'Fiction', 'Non-Fiction', 'Self-Help', 'Business', 'Biography', 'Science', 'History'].map((genre) => (
            <button
              key={genre}
              className="px-6 py-2 bg-white rounded-full shadow hover:shadow-md hover:bg-amber-50 transition font-medium text-gray-700"
            >
              {genre}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Authors Banner */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Authors This Month</h2>
          <p className="text-gray-600 mb-4">Explore works from bestselling authors and literary masters</p>
          <div className="flex flex-wrap gap-2">
            {['Malcolm Gladwell', 'James Clear', 'Cal Newport', 'Yuval Noah Harari', 'Simon Sinek'].map((author) => (
              <span key={author} className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                {author}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">Sort by:</span>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
              <option>Bestsellers</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Highest Rated</option>
              <option>Newest Releases</option>
            </select>
          </div>
          <div className="text-gray-600">
            Showing <span className="font-semibold">{products.length}</span> books
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