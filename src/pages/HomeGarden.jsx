import ProductCard from '../components/ProductCard';
import { Home } from 'lucide-react';

export default function HomeGarden() {
  const products = [
    {
      id: 1,
      name: 'Modern Ceramic Planter Set',
      price: 49.99,
      originalPrice: 79.99,
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 456,
      discount: 38,
      inStock: true
    },
    {
      id: 2,
      name: 'LED String Lights Outdoor',
      price: 29.99,
      originalPrice: 49.99,
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 892,
      discount: 40,
      inStock: true
    },
    {
      id: 3,
      name: 'Bamboo Cutting Board Set',
      price: 39.99,
      originalPrice: 59.99,
      image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=500&h=500&fit=crop',
      rating: 4.6,
      reviews: 534,
      discount: 33,
      inStock: true
    },
    {
      id: 4,
      name: 'Aromatherapy Diffuser',
      price: 34.99,
      originalPrice: 54.99,
      image: 'https://images.unsplash.com/photo-1602874801006-c6abdc7e4cce?w=500&h=500&fit=crop',
      rating: 4.5,
      reviews: 723,
      discount: 36,
      inStock: true
    },
    {
      id: 5,
      name: 'Memory Foam Pillow Set',
      price: 59.99,
      originalPrice: 89.99,
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 1245,
      discount: 33,
      inStock: true
    },
    {
      id: 6,
      name: 'Wall Mounted Shelf Organizer',
      price: 44.99,
      originalPrice: 69.99,
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&h=500&fit=crop',
      rating: 4.4,
      reviews: 367,
      discount: 36,
      inStock: true
    },
    {
      id: 7,
      name: 'Garden Tool Set 10 Piece',
      price: 79.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 445,
      discount: 33,
      inStock: true
    },
    {
      id: 8,
      name: 'Throw Blanket Cozy Knit',
      price: 39.99,
      originalPrice: 59.99,
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 678,
      discount: 33,
      inStock: true
    },
    {
      id: 9,
      name: 'Solar Garden Pathway Lights',
      price: 49.99,
      originalPrice: 79.99,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
      rating: 4.6,
      reviews: 523,
      discount: 38,
      inStock: true
    },
    {
      id: 10,
      name: 'Kitchen Utensil Set Stainless',
      price: 54.99,
      originalPrice: 84.99,
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&h=500&fit=crop',
      rating: 4.5,
      reviews: 834,
      discount: 35,
      inStock: true
    },
    {
      id: 11,
      name: 'Decorative Wall Mirror Round',
      price: 89.99,
      originalPrice: 139.99,
      image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 289,
      discount: 36,
      inStock: true
    },
    {
      id: 12,
      name: 'Indoor Herb Garden Kit',
      price: 44.99,
      originalPrice: 64.99,
      image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500&h=500&fit=crop',
      rating: 4.6,
      reviews: 512,
      discount: 31,
      inStock: true
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-700 via-teal-600 to-emerald-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Home className="text-yellow-300" size={32} />
            <h1 className="text-5xl font-bold">Home & Garden</h1>
          </div>
          <p className="text-xl text-green-100 max-w-2xl">
            Transform your living space with our beautiful home decor and garden essentials. Create your perfect sanctuary.
          </p>
          <div className="mt-8 flex gap-4">
            <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition">
              Explore Collection
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition">
              Garden Tools
            </button>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3">
          {['All Products', 'Living Room', 'Bedroom', 'Kitchen', 'Garden', 'Lighting', 'Decor', 'Storage'].map((tab) => (
            <button
              key={tab}
              className="px-6 py-2 bg-white rounded-full shadow hover:shadow-md hover:bg-green-50 transition font-medium text-gray-700"
            >
              {tab}
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
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Top Rated</option>
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