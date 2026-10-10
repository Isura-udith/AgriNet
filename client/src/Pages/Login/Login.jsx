import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg7 from '../../assets/website/bg8.jpg';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to log in.');
      }

      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('userRole', data.user.role);
      localStorage.setItem('token', data.token);

      if (data.user.role === 'buyer') {
        navigate('/buyer-dashboard');
      } else if (data.user.role === 'seller') {
        navigate('/seller-dashboard');
      } else {
        throw new Error('Unknown role. Please contact support.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${bg7})` }}
    >
      <div className="w-full max-w-md p-6 shadow-lg bg-white/85 rounded-2xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-gray-800">Login to Your Account</h1>
          <p className="mt-2 text-sm text-gray-600">Please enter your credentials to continue</p>
        </div>

        {/* Error Message */}
        {error && <div className="mb-4 text-center text-red-500">{error}</div>}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            className="w-full p-3 font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log In
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <a href="/signup" className="font-bold text-blue-500 hover:underline">
              Sign Up
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
