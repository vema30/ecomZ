import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex justify-between bg-gray-800 p-5 text-2xl items-center shadow-lg">
      <Link to={'/home'} className="text-white text-5xl font-bold hover:text-gray-400 transition duration-200">
        Ecomzy
      </Link>
      <div className="flex w-[30%] justify-end space-x-6 font-semibold text-white">
        <Link to={'/admin'} className="hover:text-gray-400 transition duration-200">Admin</Link>
        <Link to={'/home'} className="hover:text-gray-400 transition duration-200">Home</Link>
        <Link to={'/cart'} className="hover:text-gray-400 transition duration-200">Cart</Link>
        <Link to={'/login'} className="hover:text-gray-400 transition duration-200">Login</Link>
        <Link to={'/profile'} className="hover:text-gray-400 transition duration-200">Profile</Link>
      </div>
    </div>
  );
};

export default Navbar;
