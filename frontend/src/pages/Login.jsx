import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../slices/AuthSlice'; // Example action from auth slice

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Correctly define dispatch

  const handleClick = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });

      // Save the token securely
      localStorage.setItem('authToken', response.data.token);

      // Dispatch the login action to Redux
      dispatch(login({ token: response.data.token, user: response.data.user }));

      // Display success message
      setResponseMessage("Login successful!");
      alert('Login successful!');

      // Redirect to home page
      navigate("/home");

    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
      setResponseMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="bg-black h-screen w-screen flex flex-col justify-center items-center text-white text-2xl font-bold">
      {responseMessage && (
        <div className="text-red-500 text-lg mb-4">{responseMessage}</div>
      )}
      <div className="flex flex-col justify-center items-center w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-lg">
        <label className="mb-4 text-3xl text-white">Login</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          value={email}
          className="m-2 text-xl p-3 rounded-lg border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-black w-full"
        />
        <label className="mb-4 text-white">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          value={password}
          className="m-2 text-xl p-3 rounded-lg border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black w-full"
        />
        <div className="flex flex-col items-center w-full">
          <button
            onClick={handleClick}
            className="bg-green-800 text-white text-xl p-3 m-3 w-full rounded-lg hover:bg-green-700 transition duration-200"
          >
            Login
          </button>
          <Link
            to="/register"
            className="text-xl text-gray-400 underline hover:text-white"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
