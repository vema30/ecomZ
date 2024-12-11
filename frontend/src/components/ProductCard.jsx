import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg w-72 p-4 m-4">
      {/* Make the image container responsive and set fixed height for uniformity */}
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
        <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// Sample usage of the ProductCard component
const ProductList = ({ data }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
