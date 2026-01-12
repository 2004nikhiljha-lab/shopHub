import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import API from '../services/api';
import { addToCart } from "../redux/slices/cartSlice";
import formatCurrency from "../utils/formatCurrency";
import { ShoppingCart, Star, Package, Truck, Shield, Heart } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // ✅ FIXED: Corrected API call syntax
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Product not found");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: qty,
      })
    );
    alert("Added to cart!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-6 text-gray-600 text-lg font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Package className="mx-auto text-gray-400 mb-4" size={80} />
          <p className="text-red-500 text-2xl font-semibold mb-2">{error}</p>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  // Mock multiple images (you can add this to your product data later)
  const productImages = product.image 
    ? [product.image, product.image, product.image] 
    : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <a href="/" className="hover:text-blue-600">Home</a>
          <span className="mx-2">/</span>
          <a href={`/category/${product.category?.toLowerCase()}`} className="hover:text-blue-600">
            {product.category || 'Products'}
          </a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Gallery Section */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {product.discount && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full font-semibold text-sm">
                    -{product.discount}% OFF
                  </div>
                )}
                <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
                  <Heart size={24} className="text-gray-600" />
                </button>
              </div>

              {/* Thumbnail Images */}
              {productImages.length > 1 && (
                <div className="flex gap-4">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                        selectedImage === index 
                          ? 'border-blue-600' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col">
              <div className="flex-1">
                {/* Product Name */}
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

                {/* Rating and Reviews */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < Math.floor(product.rating || 4.5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating || 4.5} ({product.reviews || 0} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-blue-600">
                      {formatCurrency(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-400 line-through">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  {product.discount && (
                    <p className="text-green-600 font-semibold mt-1">
                      You save {formatCurrency(product.originalPrice - product.price)} ({product.discount}%)
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  {product.countInStock > 0 || product.stock > 0 ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <Package size={20} />
                      <span className="font-semibold">In Stock ({product.countInStock || product.stock} available)</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-500">
                      <Package size={20} />
                      <span className="font-semibold">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Quantity Selector and Add to Cart */}
                {(product.countInStock > 0 || product.stock > 0) && (
                  <div className="space-y-4 mb-6">
                    {/* Quantity */}
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-gray-900">Quantity:</span>
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => setQty(Math.max(1, qty - 1))}
                          className="px-4 py-2 hover:bg-gray-100 transition"
                        >
                          -
                        </button>
                        <span className="px-6 py-2 font-semibold">{qty}</span>
                        <button
                          onClick={() => setQty(Math.min(product.countInStock || product.stock, qty + 1))}
                          className="px-4 py-2 hover:bg-gray-100 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={addToCartHandler}
                      className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg flex items-center justify-center gap-3 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl font-semibold text-lg"
                    >
                      <ShoppingCart size={24} />
                      Add to Cart
                    </button>
                  </div>
                )}

                {/* Features */}
                <div className="grid grid-cols-1 gap-3 pt-6 border-t">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Truck className="text-blue-600" size={20} />
                    <span className="text-sm">Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Shield className="text-blue-600" size={20} />
                    <span className="text-sm">Secure payment & 30-day money back guarantee</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Package className="text-blue-600" size={20} />
                    <span className="text-sm">Easy returns within 30 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Product Information */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-8">
              <button className="pb-4 font-semibold text-blue-600 border-b-2 border-blue-600">
                Product Details
              </button>
            </div>
          </div>
          <div className="space-y-4 text-gray-700">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold">Category:</span>
                <span className="ml-2">{product.category || 'General'}</span>
              </div>
              <div>
                <span className="font-semibold">SKU:</span>
                <span className="ml-2">{product._id}</span>
              </div>
              <div>
                <span className="font-semibold">Availability:</span>
                <span className="ml-2">
                  {(product.countInStock > 0 || product.stock > 0) ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
