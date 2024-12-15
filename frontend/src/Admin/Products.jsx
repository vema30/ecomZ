import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/AddToHome'; // Import AddToHome action
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminPage from './AdminPage';

// ProductCard Component
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Check login state from Redux

  const handleAddToHome = () => {
    if (isLoggedIn) {
      dispatch(addToCart(product)); // Dispatch action to add product to "Home"
      alert('Product added to Home successfully!');
    } else {
      alert('Please login to add items to the Home.');
      navigate('/login'); // Redirect to login if not logged in
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg w-72 p-4 m-4">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <p className="text-lg font-bold text-gray-900 mb-2">${product.price}</p>
        <div className="text-yellow-500 text-sm">
          <span>Rating: {product.rating.rate}</span>
          <span> ({product.rating.count} reviews)</span>
        </div>
        <button
          onClick={handleAddToHome}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 transition"
        >
          Add to Home
        </button>
      </div>
    </div>
  );
};

// Products Component
const Products = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(''); // State to capture errors

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getproducts'); // Fetch products from backend
        setProducts(response.data); // Assuming backend returns an array of products
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>; // Display error message
  }

  return (
    <div>
      <AdminPage /> {/* Include AdminPage */}
      <div className="flex flex-wrap justify-center">
        {products.length === 0 ? (
          <p>No products available</p> // Message for empty product list
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} /> // Render ProductCard
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
