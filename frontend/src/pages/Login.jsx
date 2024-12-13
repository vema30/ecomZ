import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../slices/AuthSlice'; // Redux action for login
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const Login = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);  // Show loading message

      // API call to login
      
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email,
        password,
      });
      setLoading(false);
      toast.success('login successfull!');
      
      // Save the token in localStorage
      localStorage.setItem('authToken', response.data.token);
      setMessage(response.data.message)
      // Dispatch Redux action to store user details
      dispatch(login({ user: response.data.user }));


      // Show success toast notification
     

      // Navigate to home page
      navigate('/home');
     // window.location.reload();
    } catch (error) {
      toast.error('login failed try again!');
      setMessage(response.data.message)

      setLoading(false);  // Hide loading message

      // Show error toast notification
      
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center text-white">
      {/* Toast container to display notifications */}
      <div><ToastContainer/></div>
           {message}
      {/* Login Form */}
      {!loading ? (
        <div className="w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-lg mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-black text-lg p-3 rounded-lg border border-gray-400 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-lg mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-black text-lg p-3 rounded-lg border border-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-green-600 hover:bg-green-700 text-lg font-bold text-white py-3 rounded-lg transition duration-200"
          >
            Login
          </button>

          {/* Register Link */}
          <div className="mt-4 text-center">
            <span className="text-gray-400">Don't have an account?</span>{' '}
            <Link
              to="/register"
              className="text-blue-400 underline hover:text-blue-600"
            >
              Register here
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-xl text-white">Loading...</div>
      )}
      
    </div>
  );
};

export default Login;
