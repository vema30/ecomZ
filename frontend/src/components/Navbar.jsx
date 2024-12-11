import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

  return (
    <div className="flex justify-between bg-gray-800 p-5 text-2xl items-center shadow-lg">
      <Link to={'/home'} className="text-white text-5xl font-bold hover:text-gray-400 transition duration-200">
        Ecomzy
      </Link>
      <div className="flex w-[30%] justify-end space-x-6 font-semibold text-white">
        <Link to={'/admin'} className="hover:text-gray-400 transition duration-200">Admin</Link>
        <Link to={'/home'} className="hover:text-gray-400 transition duration-200">Home</Link>
        <Link to={'/cart'} className="hover:text-gray-400 transition duration-200">Cart</Link>

        {!token && (
          <Link to={'/login'} className="hover:text-gray-400 transition duration-200">Login</Link>
        )}
        
        {token && (
          <div className='gap-3 flex'>
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
