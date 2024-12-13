import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Admin Dashboard</h2>
      <div className="space-y-6 gap-7 ">
        <Link to="/admin/products" className="text-blue-500 mr-7">View All Products</Link>
        <Link to="/admin/add-product" className="text-green-500">Add New Product</Link>
      </div>
    </div>
  );
};

export default AdminPage;
