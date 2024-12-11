import React from 'react'
import ProductList from './ProductCard';  
import data from '../data';
const Home = () => {
  return (
    <div>
    <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold text-center mb-8">Product List</h1>
    <ProductList data={data} />
  </div>
    </div>
  )
}

export default Home
