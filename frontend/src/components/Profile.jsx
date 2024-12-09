import React from 'react';
import ChangePassword from './ChangePassword';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Name:</label>
        <span className="text-gray-800">Vema</span>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Phone Number:</label>
        <span className="text-gray-800">+123456789</span> {/* Replace with actual value */}
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Change Password:</label>
        <Link to="/changepassword" className="text-blue-500 underline hover:text-blue-700">
          Change
        </Link>
      </div>
      
      <div className="mt-4">
        <button
          className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition"
          onClick={() => alert('Password change saved!')}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
