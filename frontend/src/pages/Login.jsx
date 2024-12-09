import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="bg-black h-screen w-screen flex flex-col justify-center items-center text-white text-2xl font-bold"> 
      <div className="flex flex-col justify-center items-center w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-lg">
        
        <label className="mb-4">Login</label>
        <input
          type="email"
          placeholder="Email"
          className="m-2 text-xl p-3 rounded-lg border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
        />

        <label className="mb-4">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="m-2 text-xl p-3 rounded-lg border border-blue-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
        />

        <div className="flex flex-col items-center w-full">
          <button className="bg-green-800 text-white text-xl p-3 m-3 w-full rounded-lg hover:bg-green-700 transition duration-200">
            Login
          </button>
          <Link to="/register" className="text-xl text-gray-400 underline hover:text-white">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
