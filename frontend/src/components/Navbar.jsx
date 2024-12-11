import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('authToken'));
    };

    // Add event listener for changes to localStorage
    window.addEventListener('storage', handleStorageChange);

    // Clean up event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    alert('Logged out successfully!');
    // Trigger a local state change to re-render the navbar
    setToken(null); // Manually update the token to force a re-render
  };

  const [role, setRole] = useState(null);

  useEffect(() => {
    if (token) {
      // Fetch the profile data when the component mounts
      axios
        .get('http://localhost:3000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setRole(response.data.role);
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
        });
    }
  }, [token]);

  return (
    <div className="flex justify-between bg-gray-800 p-5 text-2xl items-center shadow-lg">
      <Link to={'/home'} className="text-white text-5xl font-bold hover:text-gray-400 transition duration-200">
        Ecomzy
      </Link>
      <div className="flex w-[30%] justify-end space-x-6 font-semibold text-white">
        {/* Conditionally render the Admin link */}
        {token && role === 'Admin' && (
          <Link to={'/admin'} className="hover:text-gray-400 transition duration-200">Admin</Link>
        )}
        <Link to={'/home'} className="hover:text-gray-400 transition duration-200">Home</Link>
        <Link to={'/cart'} className="hover:text-gray-400 transition duration-200">Cart</Link>

        {!token && (
          <Link to={'/login'} className="hover:text-gray-400 transition duration-200">Login</Link>
        )}

        {token && (
          <div className="gap-3 flex">
            <Link to={'/profile'} className="hover:text-gray-400 transition duration-200">Profile</Link>
            <div
              className="hover:text-gray-400 transition duration-200 p-2 border bg-red-800 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
