import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api"; // ✅ Import the configured API instance
import formatCurrency from "../utils/formatCurrency";
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Package,
  Truck,
  CreditCard,
  MapPin
} from "lucide-react";

export default function OrderDetails() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!userInfo?.token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        // ✅ Use API instance - no need for manual URL or auth headers
        const { data } = await API.get(`/orders/${id}`);
        setOrder(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError(err.response?.data?.message || "Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, userInfo, navigate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package size={64} className="mx-auto mb-4 text-red-400" />
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="text-gray-600 mt-2">{error}</p>
          <button
            onClick={() => navigate("/myorders")}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <button
        onClick={() => navigate("/myorders")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft size={20} />
        Back to Orders
      </button>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold">Order Details</h1>
          <p className="text-gray-600 mt-1">Order ID: {order._id}</p>
          <p className="text-sm text-gray-500">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>

        {/* Order Status */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard size={20} className="text-blue-600" />
              <h3 className="font-semibold">Payment Status</h3>
            </div>
            <div className="flex items-center gap-2">
              {order.isPaid ? (
                <>
                  <CheckCircle size={18} className="text-green-500" />
                  <span className="text-green-600 font-medium">Paid</span>
                </>
              ) : (
                <>
                  <XCircle size={18} className="text-red-500" />
                  <span className="text-red-600 font-medium">Not Paid</span>
                </>
              )}
            </div>
            {order.isPaid && order.paidAt && (
              <p className="text-sm text-gray-600 mt-1">
                Paid on {formatDate(order.paidAt)}
              </p>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Truck size={20} className="text-blue-600" />
              <h3 className="font-semibold">Delivery Status</h3>
            </div>
            <div className="flex items-center gap-2">
              {order.isDelivered ? (
                <>
                  <CheckCircle size={18} className="text-green-500" />
                  <span className="text-green-600 font-medium">Delivered</span>
                </>
              ) : (
                <>
                  <XCircle size={18} className="text-yellow-500" />
                  <span className="text-yellow-600 font-medium">In Transit</span>
                </>
              )}
            </div>
            {order.isDelivered && order.deliveredAt && (
              <p className="text-sm text-gray-600 mt-1">
                Delivered on {formatDate(order.deliveredAt)}
              </p>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={20} className="text-blue-600" />
              <h3 className="font-semibold">Shipping Address</h3>
            </div>
            <p className="text-sm text-gray-700">
              {order.shippingAddress.address}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              <br />
              {order.shippingAddress.country}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-4">Order Items</h3>
          <div className="space-y-3">
            {order.orderItems.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 border rounded-lg hover:bg-gray-50"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {formatCurrency(item.price)} × {item.qty}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {formatCurrency(item.price * item.qty)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t pt-4">
          <div className="max-w-md ml-auto">
            <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Items:</span>
                <span className="font-medium">{formatCurrency(order.itemsPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-medium">{formatCurrency(order.shippingPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax:</span>
                <span className="font-medium">{formatCurrency(order.taxPrice)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 text-lg">
                <span className="font-bold">Total:</span>
                <span className="font-bold text-blue-600">
                  {formatCurrency(order.totalPrice)}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">{order.paymentMethod}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
