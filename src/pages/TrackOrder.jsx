import { useState } from "react";
import axios from "axios";
import { Package, Search, MapPin, CheckCircle, Truck } from "lucide-react";

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `http://localhost:5000/api/orders/${orderNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Map backend data → UI format
      setTracking({
        orderNumber: data.orderNumber || data._id,
        status: data.orderStatus,
        estimatedDelivery: "3-5 Business Days",
        currentLocation: "Processing Center",
        items: data.orderItems.map((item) => ({
          name: item.name,
          quantity: item.qty,
          image: item.image,
        })),
        timeline: [
          {
            status: "Order Placed",
            date: new Date(data.createdAt).toLocaleString(),
            completed: true,
            icon: CheckCircle,
          },
          {
            status: "Processing",
            date: "Completed",
            completed: data.orderStatus !== "Pending",
            icon: Package,
          },
          {
            status: "Shipped",
            date: data.orderStatus === "Shipped" ? "In Transit" : "Pending",
            completed: ["Shipped", "Delivered"].includes(data.orderStatus),
            icon: Truck,
            current: data.orderStatus === "Shipped",
          },
          {
            status: "Delivered",
            date: data.isDelivered ? "Delivered" : "Pending",
            completed: data.isDelivered,
            icon: CheckCircle,
          },
        ],
      });
    } catch (err) {
      setError(err.response?.data?.message || "Order not found");
      setTracking(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <Package className="mx-auto text-blue-600 mb-4" size={48} />
          <h1 className="text-4xl font-bold">Track Your Order</h1>
          <p className="text-gray-600">
            Enter your order number to track your shipment
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow mb-6">
          <input
            type="text"
            placeholder="Order ID / Order Number"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          />

          <button
            onClick={handleTrack}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold"
          >
            {loading ? "Tracking..." : "Track Order"}
          </button>

          {error && (
            <p className="text-red-600 mt-3 text-center">{error}</p>
          )}
        </div>

        {tracking && (
          <>
            <div className="bg-white p-6 rounded-xl shadow mb-6">
              <h2 className="text-xl font-bold mb-2">
                Order #{tracking.orderNumber}
              </h2>
              <p>
                Status:{" "}
                <span className="font-semibold text-blue-600">
                  {tracking.status}
                </span>
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow mb-6">
              <h3 className="font-bold mb-4">Order Items</h3>
              {tracking.items.map((item, i) => (
                <div key={i} className="flex gap-4 mb-3">
                  <img src={item.image} className="w-16 h-16 rounded" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-bold mb-4">Order Timeline</h3>
              {tracking.timeline.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="flex gap-3 mb-4">
                    <Icon
                      className={`${
                        step.completed ? "text-blue-600" : "text-gray-400"
                      }`}
                    />
                    <div>
                      <p className="font-semibold">{step.status}</p>
                      <p className="text-sm text-gray-500">{step.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
