import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/CartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
store.subscribe(() => {
    console.log('Store updated:', store.getState());
  });
  

export default store;
