import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phonenumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(formData);
    // Ensure passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/users/register', formData);
      if (response.data.success) {
        setMessage("Registration successful! Redirecting to login...");
        // Redirect to login or another page here if needed
      } else {
        setMessage(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setMessage("Error: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center text-white font-bold mt-12 absolute top-[200px]">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center">Register</h2>
        {message && <p className="text-red-500 mb-4 text-center">{message}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* First Name */}
          <label className="flex flex-col mb-2">
            <span className="mb-2">First Name</span>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="text-black p-3 rounded-lg border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your first name"
              required
            />
          </label>

          {/* Last Name */}
          <label className="flex flex-col mb-2">
            <span className="mb-2">Last Name</span>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="text-black p-3 rounded-lg border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your last name"
              required
            />
          </label>

          {/* Email */}
          <label className="flex flex-col mb-2">
            <span className="mb-2">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="text-black p-3 rounded-lg border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email"
              required
            />
          </label>

          {/* Role Selection */}
          <div className="flex gap-6 mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="user"
                onChange={handleChange}
                className="m-2"
              />
              <span>User</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="Admin"
                onChange={handleChange}
                className="m-2"
              />
              <span>Admin</span>
            </label>
          </div>

          {/* Phone Number */}
          <label className="flex flex-col mb-4">
            <span className="mb-2">Phone Number</span>
            <input
              type="text"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              className="text-black p-3 rounded-lg border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your phone number"
              required
            />
          </label>

          {/* Password */}
          <label className="flex flex-col mb-4">
            <span className="mb-2">Password</span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="text-black p-3 rounded-lg border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="mt-2 bg-gray-600 text-white py-1 px-4 rounded-lg hover:bg-gray-500"
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          </label>

          {/* Confirm Password */}
          <label className="flex flex-col mb-4">
            <span className="mb-2">Confirm Password</span>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="text-black p-3 rounded-lg border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Confirm your password"
              required
            />
          </label>

          {/* Actions */}
          <div className="flex flex-col items-center mt-6">
            <button
              type="submit"
              className="bg-green-900 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-800 transition duration-200 mb-4"
            >
              Sign Up
            </button>
            <Link to="/login" className="text-blue-400 underline hover:text-white">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
