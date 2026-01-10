import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { addToCart } from "../redux/slices/cartSlice";
import formatCurrency from "../utils/formatCurrency";
import { ShoppingCart } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams(); // product id from URL
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
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
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-lg shadow"
        />

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <p className="text-gray-600 mb-4">{product.description}</p>

          <p className="text-2xl font-bold text-blue-600 mb-4">
            {formatCurrency(product.price)}
          </p>

          {product.countInStock > 0 ? (
            <>
              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-semibold">Qty:</span>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="border px-3 py-2 rounded"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* Add to Cart */}
              <button
                onClick={addToCartHandler}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </>
          ) : (
            <p className="text-red-500 font-semibold">Out of Stock</p>
          )}
        </div>
      </div>
    </div>
  );
}
