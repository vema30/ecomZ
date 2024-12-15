import React from 'react'; // No need for useState since it's unused
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state
import ProductList from './ProductCard';  
import data from '../data'; // Assuming static data

const Home = () => {
  // Access Redux state
  const cartItems = useSelector((state) => state.homeCart); 
  // Combine static data with cart items
  const dataGroup = [...data, ...cartItems];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Product List</h1>
      <ProductList data={dataGroup} /> {/* Pass combined data as a prop */}
    </div>
  );
};

export default Home;
