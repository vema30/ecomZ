import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { useDispatch } from 'react-redux';
import { logout } from '../slices/AuthSlice'; 
const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [role, setRole] = useState(null);
  const dispatch = useDispatch();

  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('authToken'));
    };

    // Add event listener for changes to localStorage
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (token) {
      // Fetch the profile data when the token is present
      axios
        .get('http://localhost:3000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('Profile data:', response.data);
          setRole(response.data.role);
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
        });
    }
  }, [token]);

  const handleLogout = () => {
    toast.success('login out successfull!');
    localStorage.removeItem('authToken');
    alert('Logged out successfully!');
    setToken(null); // Update the token to re-render the navbar
    dispatch(logout());
  };

  return (
    <nav className="flex justify-between items-center bg-gray-900 p-4 shadow-md text-white">
      <div className="flex items-center space-x-4">
        <Link to="/home" className="text-3xl font-bold text-blue-400 hover:text-blue-300">
          Ecomzy
        </Link>
      </div>

      <div className="flex items-center space-x-6">
        {role === 'Admin' && (
          <Link to="/admin" className="text-lg hover:text-blue-300 transition">
            Admin
          </Link>
        )}
        <Link to="/home" className="text-lg hover:text-blue-300 transition">
          Home
        </Link>
        <Link to="/cart" className="text-lg hover:text-blue-300 transition">
          Cart
        </Link>

        {!token ? (
          <Link to="/login" className="text-lg hover:text-blue-300 transition">
            Login
          </Link>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="text-lg hover:text-blue-300 transition">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-500 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
