import React from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
  const cart = useSelector((state) => state.cart); // Access cart state from Redux store
console.log("hey",cart)
  return (
    <div className='text-black'>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} style={{ marginBottom: '10px' }}>
            <p>Product: {item.title}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
