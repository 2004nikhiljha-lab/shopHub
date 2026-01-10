import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, CheckCircle, XCircle, Eye } from "lucide-react";
import formatCurrency from "../utils/formatCurrency";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  // Base API URL from environment variable
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!userInfo?.token || !userInfo?.isAdmin) {
      navigate("/");
      return;
    }

    fetchOrders();
  }, [userInfo, navigate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setOrders(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, isPaid, isDelivered) => {
    try {
      await axios.put(
        `${API_URL}/api/admin/orders/${orderId}`,
        { isPaid, isDelivered },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      fetchOrders(); // Refresh orders
      alert("Order status updated successfully!");
    } catch (err) {
      console.error("Error updating order:", err);
      alert(err.response?.data?.message || "Failed to update order");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold mb-6">All Orders ({orders.length})</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Paid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Delivered
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">#{order._id.slice(-8)}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{order.user?.name || "N/A"}</p>
                      <p className="text-sm text-gray-600">{order.user?.email || "N/A"}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{formatDate(order.createdAt)}</td>
                  <td className="px-6 py-4 font-medium">{formatCurrency(order.totalPrice)}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => updateOrderStatus(order._id, !order.isPaid, order.isDelivered)}
                      className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${
                        order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.isPaid ? (
                        <>
                          <CheckCircle size={14} /> Paid
                        </>
                      ) : (
                        <>
                          <XCircle size={14} /> Unpaid
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => updateOrderStatus(order._id, order.isPaid, !order.isDelivered)}
                      className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${
                        order.isDelivered ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.isDelivered ? (
                        <>
                          <CheckCircle size={14} /> Delivered
                        </>
                      ) : (
                        <>
                          <XCircle size={14} /> Pending
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/order/${order._id}`)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
