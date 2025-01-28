import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../../services/fetchUserData";

const BuyerDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      navigate("/login");
      return;
    }

    fetchUserData(userId, token)
      .then((data) => {
        setUserData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch user data:", err.message);
        setError("Failed to fetch user data. Please try again.");
        setIsLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleUpdatePassword = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password updated successfully!"); // Replace with API call to update password
  };

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-emerald-200 animate-gradient-xy">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-emerald-800 drop-shadow-md">
          Welcome, {userData.name}
        </h1>
        <p className="mt-2 text-lg font-semibold text-emerald-800">Email: {userData.email}</p>
      </div>

      {/* Stats Section */}
      <div className="grid max-w-4xl gap-6 px-6 mx-auto sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105">
          <h3 className="text-gray-600">Total Purchases</h3>
          <p className="text-3xl font-bold text-indigo-600">{userData.totalPurchases || 0}</p>
        </div>
        <div className="p-6 transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105">
          <h3 className="text-gray-600">Wishlist Items</h3>
          <p className="text-3xl font-bold text-green-600">{userData.wishlist || 0}</p>
        </div>
        <div className="p-6 transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105">
          <h3 className="text-gray-600">Pending Orders</h3>
          <p className="text-3xl font-bold text-red-600">{userData.pendingOrders || 0}</p>
        </div>
      </div>

      {/* Update Password Section */}
      <div className="max-w-lg p-8 mx-auto mt-12 bg-white shadow-lg rounded-xl">
        <h2 className="mb-6 font-sans text-2xl font-bold text-center text-gray-800">
          Update Your Password
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={handleUpdatePassword}
            className="w-full px-4 py-2 font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-400"
          >
            Update Password
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-12 text-center">
        <button
          onClick={handleLogout}
          className="px-6 py-3 text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default BuyerDashboard;
