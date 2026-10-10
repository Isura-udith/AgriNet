import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Home/Home";
import Market from "./Pages/Market/Market";
import Cart from "./Pages/Cart/Cart";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import BuyerDashboard from "./Pages/Dashboard/BuyerDashboard";
import SellerDashboard from "./Pages/Dashboard/SellerDashboard";
import NotFound from "./Pages/NotFound/NotFound";
import Product from "./components/Product/Product";
import Admin from "./Pages/Admin/Admin";
import AdminDashboardSeller from "./Pages/Admin/AdminDashboardSeller";
import AdminDashboardBuyer from "./Pages/Admin/AdminDashboardBuyer";
import AdminPayment from "./Pages/Admin/AdminPayment";

function App() {
  const [user, setUser] = useState(null);

  // To persist user session
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Restore user from localStorage
    }
  }, []);

  // Handle logout to clear session
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <div className="overflow-x-hidden">
        <Navbar user={user} onLogout={handleLogout} /> {/* Pass user and logout handler */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} /> 
          <Route path="/product" element={<Product />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/sellers" element={<AdminDashboardSeller />} />
          <Route path="/buyers" element={<AdminDashboardBuyer />} />
          <Route path="/Adminpayment" element={<AdminPayment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;