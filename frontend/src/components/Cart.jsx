import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../slices/cartSlice';
import { Link } from 'react-router-dom';
const Cart = () => {
  const cart = useSelector((state) => state.cart); // Access cart state from Redux store
  const dispatch = useDispatch();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center bg-black m-10 p-10 text-white text-6xl">
        <div>Cart is empty</div>
        <Link
          to="/home"
          className="p-4 bg-red-500 m-4 text-white text-2xl rounded hover:bg-red-600"
        >
          Home
        </Link>
      </div>
    );
  }
  
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      handleRemove(id);
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Calculate total price
  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  }, [cart]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border-b border-gray-300"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-300 text-black rounded"
                >
                  -
                </button>
                <span className="w-8 text-center text-black font-bold">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-300 text-black rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4">
            <button
              onClick={handleClearCart}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
      <div className="mt-6 text-lg font-bold text-white">
        <div>Total: ${totalPrice}</div>
      </div>
    </div>
  );
};

export default Cart;
