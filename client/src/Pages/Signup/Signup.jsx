import { useState } from 'react';
import AlertPopup from '../../components/AlertPopup/AlertPopup';
import bg5 from '../../assets/website/bg5.jpg';

const Signup = () => {
  const [isSeller, setIsSeller] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    idNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
    province: '',
  });

  const [alert, setAlert] = useState({
    message: '',
    type: '', // "success" or "error"
    isVisible: false,
  });

  const provinces = [
    'Central', 'Eastern', 'Northern', 'North Central', 'North Western',
    'Sabaragamuwa', 'Southern', 'Uva', 'Western',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateSellerFields = () => {
    if (!formData.phone || !formData.idNumber || !formData.address || !formData.province) {
      setAlert({
        message: 'All seller fields are required!',
        type: 'error',
        isVisible: true,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setAlert({
        message: 'Passwords do not match!',
        type: 'error',
        isVisible: true,
      });
      return;
    }

    if (isSeller && !validateSellerFields()) return;

    const userData = {
      name: formData.name,
      email: formData.email,
      phone: isSeller ? formData.phone : undefined,
      idNumber: isSeller ? formData.idNumber : undefined,
      address: isSeller ? formData.address : undefined,
      password: formData.password,
      province: isSeller ? formData.province : undefined,
      role: isSeller ? 'seller' : 'buyer',
    };

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        setAlert({
          message: 'User registered successfully!',
          type: 'success',
          isVisible: true,
        });
        // Clear the form
        setFormData({
          name: '',
          email: '',
          phone: '',
          idNumber: '',
          address: '',
          password: '',
          confirmPassword: '',
          province: '',
        });
        setIsSeller(false); // Reset role
      } else {
        setAlert({
          message: result.message || 'Registration failed. Please try again.',
          type: 'error',
          isVisible: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setAlert({
        message: 'An error occurred while submitting the form. Please try again.',
        type: 'error',
        isVisible: true,
      });
    }
  };

  return (
    <div
      className="flex items-center justify-center bg-center bg-cover h-[800px]"
      style={{ backgroundImage: `url(${bg5})` }}
    >
      {/* Alert Popup */}
      <AlertPopup
        message={alert.message}
        type={alert.type}
        isVisible={alert.isVisible}
        onClose={() => setAlert({ ...alert, isVisible: false })}
      />

      <div className="w-full max-w-2xl p-6 py-6 shadow-lg bg-white/85 rounded-2xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-gray-800">Create Your Account</h1>
          <p className="mt-2 text-sm text-gray-600">Choose your role to get started</p>
        </div>

        {/* Role Toggle */}
        <div className="flex justify-center mb-6 space-x-6">
          <button
            className={`px-6 py-2 w-28 rounded-full text-sm font-semibold ${
              !isSeller ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setIsSeller(false)}
          >
            Buyer
          </button>
          <button
            className={`px-6 py-2 w-28 rounded-full text-sm font-semibold ${
              isSeller ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setIsSeller(true)}
          >
            Seller
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {isSeller && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">ID Number</label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  placeholder="Enter your ID number"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Province</label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Province</option>
                  {provinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;