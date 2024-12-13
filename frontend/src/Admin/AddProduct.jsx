import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null); // Updated to hold file
  const [rating, setRating] = useState(1); // Rating (1-5)
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Only take the first file
    if (file) {
      setImage(file); // Set the image file state
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the input fields
    if (!title || !price || !description || !category || !image || rating < 1 || rating > 5) {
      toast.error('Please fill out all fields correctly.');
      return;
    }

    // Show loading state
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', parseFloat(price)); // Convert to number
    formData.append('description', description);
    formData.append('category', category);
    formData.append('rating', JSON.stringify({ rate: parseFloat(rating), count: 0 })); // Rating should be passed as an object
    formData.append('image', image); // Append the image file

    try {
      // Send POST request to the backend API
      const response = await axios.post('http://localhost:3000/api/users/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important to set the content type for file upload
        },
      });

      // Handle successful response
      toast.success('Product added successfully!');
      setLoading(false);

      // Reset form fields after submission
      setTitle('');
      setPrice('');
      setDescription('');
      setCategory('');
      setImage(null);
      setRating(1);

    } catch (error) {
      setLoading(false);
      console.error('Error adding product:', error);
      toast.error('Error adding product. Please try again later.');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 text-black rounded-lg border"
        />
        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 text-black rounded-lg border"
        />
        {/* Description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 text-black rounded-lg border"
        />
        {/* Category */}
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 text-black rounded-lg border"
        />
        {/* Image Upload */}
        <input
          type="file"
          onChange={handleImageChange} // Handle file change
          className="w-full p-3 text-black rounded-lg border"
        />
        {/* Rating */}
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full p-3 text-black rounded-lg border"
          min="1"
          max="5"
        />
        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-green-600 text-white py-3 px-6 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
