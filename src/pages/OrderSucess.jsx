import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, Package, Home } from "lucide-react";

export default function OrderSuccess() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Confetti effect (optional)
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const confetti = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(confetti);
      }

      // Simple confetti simulation
      const particleCount = 2;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.style.position = "fixed";
        particle.style.width = "10px";
        particle.style.height = "10px";
        particle.style.backgroundColor = `hsl(${randomInRange(0, 360)}, 100%, 50%)`;
        particle.style.left = `${randomInRange(0, 100)}%`;
        particle.style.top = "-10px";
        particle.style.borderRadius = "50%";
        particle.style.pointerEvents = "none";
        particle.style.zIndex = "9999";
        document.body.appendChild(particle);

        const animation = particle.animate(
          [
            { transform: "translateY(0) rotate(0deg)", opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${randomInRange(0, 360)}deg)`, opacity: 0 },
          ],
          {
            duration: randomInRange(2000, 4000),
            easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }
        );

        animation.onfinish = () => particle.remove();
      }
    }, 50);

    return () => clearInterval(confetti);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckCircle size={64} className="text-green-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>

        {/* Order ID */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-600 mb-1">Order ID</p>
          <p className="font-mono font-semibold text-lg">#{orderId?.slice(-8)}</p>
        </div>

        {/* Order Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            📧 A confirmation email has been sent to your registered email address with order details.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate(`/order/${orderId}`)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Package size={20} />
            View Order Details
          </button>

          <button
            onClick={() => navigate("/myorders")}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200"
          >
            My Orders
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Continue Shopping
          </button>
        </div>

        {/* Delivery Info */}
        <div className="mt-6 pt-6 border-t text-sm text-gray-600">
          <p>🚚 Estimated delivery: 3-5 business days</p>
          <p className="mt-1">📦 You can track your order from "My Orders" section</p>
        </div>
      </div>
    </div>
  );
}