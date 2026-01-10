import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearCart } from "../redux/slices/cartSlice";
import { CreditCard, Loader } from "lucide-react";

export default function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const userInfo = useSelector((state) => state.user.userInfo);

  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  // Calculate prices
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 40;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    // Load shipping address from localStorage
    const savedAddress = localStorage.getItem("shippingAddress");
    const savedPaymentMethod = localStorage.getItem("paymentMethod");

    if (!savedAddress || !cartItems.length) {
      navigate("/checkout");
      return;
    }

    setShippingAddress(JSON.parse(savedAddress));
    setPaymentMethod(savedPaymentMethod || "razorpay");
  }, [cartItems, navigate]);

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!userInfo?.token) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      if (paymentMethod === "cod") {
        // Handle Cash on Delivery
        await createOrder(false, null);
      } else if (paymentMethod === "razorpay") {
        // Handle Razorpay Payment
        const scriptLoaded = await loadRazorpayScript();

        if (!scriptLoaded) {
          alert("Failed to load payment gateway. Please try again.");
          setLoading(false);
          return;
        }

        // Create Razorpay order
        const { data: orderData } = await axios.post(
          "http://localhost:5000/api/payment/razorpay/create-order",
          {
            amount: total * 100, // Convert to paise
          },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );

        // Razorpay options
        const options = {
          key: orderData.key_id, // Get from backend
          amount: orderData.amount,
          currency: "INR",
          name: "ShopHub",
          description: "Order Payment",
          order_id: orderData.order_id,
          handler: async function (response) {
            // Payment successful
            await createOrder(true, response);
          },
          prefill: {
            name: shippingAddress.fullName,
            email: userInfo.email,
            contact: shippingAddress.phone,
          },
          theme: {
            color: "#2563eb",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();

        razorpay.on("payment.failed", function (response) {
          alert("Payment failed. Please try again.");
          setLoading(false);
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(error.response?.data?.message || "Payment failed");
      setLoading(false);
    }
  };

  const createOrder = async (isPaid, paymentResult) => {
    try {
      const orderItems = cartItems.map((item) => ({
        product: item._id || item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        qty: item.quantity,
      }));

      const orderData = {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: subtotal,
        taxPrice: tax,
        shippingPrice: shipping,
        totalPrice: total,
        isPaid,
        paidAt: isPaid ? new Date().toISOString() : undefined,
        paymentResult: paymentResult || undefined,
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/orders",
        orderData,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      // Clear cart and navigate to success
      dispatch(clearCart());
      localStorage.removeItem("shippingAddress");
      localStorage.removeItem("paymentMethod");

      navigate(`/order-success/${data._id}`);
    } catch (error) {
      console.error("Order creation error:", error);
      alert(error.response?.data?.message || "Failed to create order");
      setLoading(false);
    }
  };

  if (!shippingAddress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <CreditCard size={48} className="text-blue-600" />
        </div>

        <h1 className="text-3xl font-bold text-center mb-2">Complete Payment</h1>
        <p className="text-center text-gray-600 mb-8">
          You're just one step away from your order
        </p>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="font-semibold mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Items ({cartItems.length})</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (GST)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
              <span>Total Amount</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="font-semibold mb-3">Shipping Address</h3>
          <p className="text-sm">
            {shippingAddress.fullName}
            <br />
            {shippingAddress.address}
            <br />
            {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.postalCode}
            <br />
            {shippingAddress.country}
            <br />
            Phone: {shippingAddress.phone}
          </p>
        </div>

        {/* Payment Method */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="font-semibold mb-3">Payment Method</h3>
          <p className="text-sm capitalize">
            {paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment (Razorpay)"}
          </p>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-4 rounded-lg font-semibold text-white text-lg ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader className="animate-spin" size={20} />
              Processing...
            </span>
          ) : (
            `Pay ₹${total.toFixed(2)}`
          )}
        </button>

        <button
          onClick={() => navigate("/checkout")}
          className="w-full mt-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back to Checkout
        </button>

        <p className="text-center text-xs text-gray-500 mt-4">
          🔒 Your payment information is encrypted and secure
        </p>
      </div>
    </div>
  );
}