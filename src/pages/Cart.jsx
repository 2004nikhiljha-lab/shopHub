import { useDispatch, useSelector } from "react-redux";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { removeFromCart, addToCart, clearCart } from "../redux/slices/cartSlice";
import formatCurrency from "../utils/formatCurrency";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const userInfo = useSelector((state) => state.user.userInfo);

  const updateQuantity = (item, change) => {
    const newQty = item.quantity + change;
    if (newQty < 1) return;
    dispatch(addToCart({ ...item, quantity: newQty }));
  };

  const removeItem = (item) => {
    const itemId = item._id || item.id;
    dispatch(removeFromCart(itemId));
  };

  const clearCartHandler = () => dispatch(clearCart());

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const proceedToCheckout = () => {
    if (!userInfo?.token) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }
    
    if (!cartItems.length) {
      alert("Cart is empty");
      return;
    }

    // Validate cart items
    const invalidItems = cartItems.filter(item => (!item._id && !item.id) || !item.name || !item.price);
    if (invalidItems.length > 0) {
      console.error("Invalid cart items:", invalidItems);
      alert("Some cart items are missing required information. Please refresh and try again.");
      return;
    }
    
    // Navigate to checkout page
    navigate("/checkout");
  };

  if (!cartItems.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={64} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <p>Add some products to place an order.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={clearCartHandler}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white shadow rounded-lg">
          {cartItems.map((item, index) => (
            <div key={item._id || item.id || index} className="flex gap-4 p-6 border-b last:border-none">
              <img src={item.image} alt={item.name} className="w-24 h-24 rounded object-cover" />
                <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-blue-600 font-bold">{formatCurrency(item.price)}</p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <button onClick={() => removeItem(item)}>
                  <Trash2 className="text-red-500" />
                </button>
                <div className="flex items-center border rounded">
                  <button onClick={() => updateQuantity(item, -1)} className="p-2">
                    <Minus size={16} />
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item, 1)} className="p-2">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{formatCurrency(shipping)}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>{formatCurrency(tax)}</span></div>
            <div className="flex justify-between font-bold border-t pt-2"><span>Total</span><span>{formatCurrency(total)}</span></div>
          </div>
          <button
            onClick={proceedToCheckout}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded flex justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            Proceed to Checkout <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}