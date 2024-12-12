import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/CartSlice';
import authReducer from './slices/AuthSlice'; // Example auth slice, optional

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer, // Add more slices as needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Adjust this if you handle non-serializable data like dates
    }),
});

store.subscribe(() => {
  console.log('Store updated:', store.getState());
});

export default store;
