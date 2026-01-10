import { createSlice } from "@reduxjs/toolkit";

// Initial state for products
const initialState = {
  products: [],       // All products
  selectedProduct: null, // Product details when viewing
  loading: false,     // Loading state
  error: null,        // Error messages
};

// Create product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
});

// Named exports for actions
export const {
  setProducts,
  setSelectedProduct,
  setLoading,
  setError,
  clearSelectedProduct,
} = productSlice.actions;

// ✅ Default export for store
export default productSlice.reducer;
