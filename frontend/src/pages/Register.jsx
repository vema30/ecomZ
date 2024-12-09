import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="bg-black h-screen w-screen flex flex-col items-center justify-center text-white font-bold">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center">Register</h2>

        <div className="flex flex-col gap-4">
          <label className="flex flex-col mb-2">
            <span className="mb-2">First Name</span>
            <input
              type="text"
              className="text-black p-3 rounded-lg border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </label>

          <label className="flex flex-col mb-2">
            <span className="mb-2">Last Name</span>
            <input
              type="text"
              className="text-black p-3 rounded-lg border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </label>

          <div className="flex gap-6 mb-4">
            <label className="flex items-center">
              <input type="radio" name="user" className="m-2" />
              <span>Student</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="user" className="m-2" />
              <span>Admin</span>
            </label>
          </div>

          <label className="flex flex-col mb-4">
            <span className="mb-2">Phone Number</span>
            <input
              type="text"
              name="phone"
              className="text-black p-3 rounded-lg border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </label>
        </div>

        <div className="flex flex-col items-center mt-6">
          <button className="bg-green-900 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-800 transition duration-200 mb-4">
            Sign Up
          </button>
          <Link to="/login" className="text-blue-400 underline hover:text-white">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
