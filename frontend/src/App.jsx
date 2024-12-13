import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Cart from './components/Cart';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './components/Profile';
import { Routes, Route } from 'react-router-dom';
import ChangePassword from './components/ChangePassword';
import AdminPage from './Admin/AdminPage';
import AddProduct from './Admin/AddProduct';
import Products from './Admin/Products';
const App = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow p-4">
        <Routes>
          <Route path="/" index element={<p className="text-center text-xl">Welcome to Ecomzy</p>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-center p-3 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Ecomzy. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
