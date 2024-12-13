import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/CartSlice';
import authReducer from './slices/AuthSlice';

// Check for saved token and user in localStorage
const savedToken = localStorage.getItem('authToken');
const savedUser = JSON.parse(localStorage.getItem('user'));

// Set initial state based on localStorage data, or default to unauthenticated state
const initialAuthState = savedToken
  ? { isLoggedIn: true, user: savedUser, token: savedToken }
  : { isLoggedIn: false, user: null, token: null };

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer, // Include auth slice for handling authentication state
  },
  preloadedState: {
    auth: initialAuthState, // Initialize the auth state from localStorage (if any)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Adjust this if you handle non-serializable data like dates
    }),
});

// Subscribe to store updates to log them (optional)
store.subscribe(() => {
  console.log('Store updated:', store.getState());
});

export default store;
