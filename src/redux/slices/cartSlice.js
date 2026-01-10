import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const loadCartFromStorage = () => {
  const cart = localStorage.getItem("cartItems");
  return cart ? JSON.parse(cart) : [];
};

// Save cart to localStorage
const saveCartToStorage = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

const initialState = {
  items: loadCartFromStorage(), // [{ _id, name, price, image, quantity }]
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload; // { _id, name, price, image, quantity }

      const existingItem = state.items.find(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItem) {
        // If payload includes quantity, use it; else increment by 1
        existingItem.quantity = item.quantity
          ? item.quantity
          : existingItem.quantity + 1;
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }

      saveCartToStorage(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      saveCartToStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
