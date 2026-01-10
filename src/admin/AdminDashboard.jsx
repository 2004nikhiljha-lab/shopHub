import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Clock,
  CheckCircle,
  TrendingUp,
  Package
} from "lucide-react";
import formatCurrency from "../utils/formatCurrency";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
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

    const fetchStats = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${API_URL}/api/admin/stats`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        setStats(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError(err.response?.data?.message || "Failed to fetch statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userInfo, navigate, API_URL]);

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
        <div className="text-center">
          <p className="text-red-600 text-xl">{error}</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Users className="text-blue-600" size={32} />,
      bgColor: "bg-blue-50",
      link: "/admin/users"
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <ShoppingBag className="text-green-600" size={32} />,
      bgColor: "bg-green-50",
      link: "/admin/orders"
    },
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: <DollarSign className="text-purple-600" size={32} />,
      bgColor: "bg-purple-50"
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: <Clock className="text-yellow-600" size={32} />,
      bgColor: "bg-yellow-50"
    },
    {
      title: "Delivered Orders",
      value: stats.deliveredOrders,
      icon: <CheckCircle className="text-emerald-600" size={32} />,
      bgColor: "bg-emerald-50"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <TrendingUp className="text-blue-600" />
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Overview of your ecommerce store</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            onClick={() => stat.link && navigate(stat.link)}
            className={`${stat.bgColor} p-6 rounded-lg shadow hover:shadow-lg transition-shadow ${
              stat.link ? 'cursor-pointer' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders & Users */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <button
              onClick={() => navigate("/admin/orders")}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {stats.recentOrders.map((order) => (
              <div
                key={order._id}
                className="border-l-4 border-blue-600 pl-4 py-2 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{order.user?.name || "N/A"}</p>
                    <p className="text-sm text-gray-600">
                      {order.orderItems.length} items • {formatCurrency(order.totalPrice)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        order.isDelivered
                          ? "bg-green-100 text-green-700"
                          : order.isPaid
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.isDelivered ? "Delivered" : order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Users</h2>
            <button
              onClick={() => navigate("/admin/users")}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {stats.recentUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="font-bold text-blue-600">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                {user.isAdmin && (
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    Admin
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <button
          onClick={() => navigate("/admin/orders")}
          className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Package size={20} />
          Manage All Orders
        </button>
        <button
          onClick={() => navigate("/admin/users")}
          className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <Users size={20} />
          Manage All Users
        </button>
      </div>
    </div>
  );
}
