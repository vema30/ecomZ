import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('homeCart')) || []; // Load from localStorage or start empty

const AddToHome = createSlice({
  name: 'homeCart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('homeCart', JSON.stringify(state)); // Save to localStorage
    },
    removeFromCart: (state, action) => {
      const updatedState = state.filter((item) => item.id !== action.payload);
      localStorage.setItem('homeCart', JSON.stringify(updatedState)); // Save to localStorage
      return updatedState;
    },
    clearCart: () => {
      localStorage.removeItem('homeCart'); // Clear localStorage
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = AddToHome.actions;
export default AddToHome.reducer;
