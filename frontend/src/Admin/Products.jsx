import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/CartSlice'; // Import the action
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For fetching product data from the backend
import AdminPage from './AdminPage';
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Check login state from Redux

  const handleAddToCart = () => {
    if (isLoggedIn) {
      dispatch(addToCart(product)); // Dispatch the action with the product data
      alert('Product added to cart!');
    } else {
      alert('Please login to add items to the cart.');
      navigate('/login'); // Redirect to login page if not logged in
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
          onClick={handleAddToCart}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getproducts'); // Adjust the URL to your backend API
        setProducts(response.data); // Assuming the backend returns an array of products
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while data is being fetched
  }

  return (
    <div><AdminPage/>
    <div className="flex flex-wrap justify-center">
    
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        products.map((product) => <ProductCard key={product.id} product={product} />) // Render ProductCard for each product
      )}
    </div>
    </div>
  );
};

export default Products;
