import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../../services/fetchUserData";
import { LogOut } from "lucide-react"; // Using an icon for logout
import Product from "../../components/Product/Product";

const SellerDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      navigate("/login");
      return;
    }

    fetchUserData(userId, token)
      .then((data) => setUserData(data))
      .catch((err) => {
        console.error("Failed to fetch user data:", err.message);
        setError("Failed to fetch user data");
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!userData) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="min-h-screen pb-16 bg-gradient-to-br from-green-400 via-emerald-300 to-green-600">
      {/* Header Section */}
      <div className="relative flex flex-col items-center py-8 text-white shadow-lg bg-gradient-to-r from-emerald-700 to-green-800">
        <h1 className="text-4xl font-extrabold tracking-wide uppercase">
          Wellcome {userData.name}
        </h1>
        <p className="mt-2 text-lg text-gray-100 opacity-90">
          Manage your profile and products with ease
        </p>
        <div className="absolute bottom-2 right-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition duration-200 bg-red-500 rounded-full shadow-lg hover:bg-red-600 hover:scale-105"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Seller Details Section */}
      <div className="max-w-5xl mx-auto mt-12 overflow-hidden bg-white shadow-lg rounded-2xl">
        <div className="px-10 py-8">
          <h2 className="mb-6 font-serif text-2xl font-bold text-center text-gray-800">
            Seller Details
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Left Column (Labels) */}
            <div className="space-y-6 font-medium text-gray-700">
              <div className="flex items-center">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-200">
                  👤
                </span>
                <p className="ml-3">Full Name:</p>
              </div>
              <div className="flex items-center">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-200">
                  📞
                </span>
                <p className="ml-3">Phone Number:</p>
              </div>
              <div className="flex items-center">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-200">
                  🆔
                </span>
                <p className="ml-3">ID Number:</p>
              </div>
              <div className="flex items-center">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-200">
                  📍
                </span>
                <p className="ml-3">Address:</p>
              </div>
              <div className="flex items-center">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-200">
                  🌍
                </span>
                <p className="ml-3">Province:</p>
              </div>
            </div>

            {/* Right Column (Data) */}
            <div className="space-y-6 text-gray-900">
              <p className="flex items-center pb-2 border-b">{userData.name}</p>
              <p className="flex items-center pb-2 border-b">{userData.phone}</p>
              <p className="flex items-center pb-2 border-b">{userData.idNumber}</p>
              <p className="flex items-center pb-2 border-b">{userData.address}</p>
              <p className="flex items-center pb-2 border-b">{userData.province}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Management Section */}
      <div className="relative max-w-4xl px-4 py-16 pb-12 mx-auto mt-12 shadow-xl bg-emerald-50 rounded-2xl">
        <h2 className="pt-8 mb-6 text-3xl font-bold text-center text-gray-800 ">
          Manage Your Products
        </h2>
        <Product />
        {/* Badge */}
        <div className="absolute px-3 py-1 text-sm font-medium text-gray-900 bg-yellow-400 rounded-full shadow-md top-4 left-4 animate-pulse">
          🚀 Productivity Mode
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
