import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, Edit2 } from "lucide-react";
import { logout } from "../redux/slices/userSlice";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user info from Redux
  const userInfo = useSelector((state) => state.user.userInfo);

  // Redirect to login if not logged in
  if (!userInfo) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-6">My Profile</h1>

        {/* User Info Section */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl font-bold">
              {userInfo.name.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1 space-y-4">
            <div className="border-b pb-2">
              <h2 className="font-semibold text-gray-600">Full Name</h2>
              <p className="text-gray-900">{userInfo.name}</p>
            </div>

            <div className="border-b pb-2">
              <h2 className="font-semibold text-gray-600">Email</h2>
              <p className="text-gray-900">{userInfo.email}</p>
            </div>

            {userInfo.phone && (
              <div className="border-b pb-2">
                <h2 className="font-semibold text-gray-600">Phone</h2>
                <p className="text-gray-900">{userInfo.phone}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition font-semibold"
              >
                <LogOut size={16} /> Logout
              </button>

              <button
                onClick={() => alert("Edit profile feature coming soon!")}
                className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                <Edit2 size={16} /> Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Order History Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">My Orders</h2>
          <div className="border rounded-lg bg-gray-50 p-4 text-gray-600 text-center">
            You have not placed any orders yet.
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="w-full md:w-auto bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
