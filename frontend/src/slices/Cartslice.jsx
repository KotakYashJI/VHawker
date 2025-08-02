import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Cart: [],
};

export const Cartslice = createSlice({
  name: "Cartslice",
  initialState,
  reducers: {
    AddTocart: (state, action) => {
      const { product, quantityToAdd = 1 } = action.payload || {};
      
      // Defensive check to avoid crashing on undefined product
      if (!product || !product.id) {
        console.warn("Invalid product format in AddTocart reducer:", product);
        return;
      }

      const existingItemIndex = state.Cart.findIndex(
        (item) => item._id === product._id
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.Cart[existingItemIndex];
        const newQuantity = existingItem.quantity + quantityToAdd;

        if (newQuantity <= product.productquantity) {
          existingItem.quantity = newQuantity;
        } else {
          existingItem.quantity = product.productquantity;
        }
      } else {
        state.Cart.push({
          ...product,
          quantity: Math.min(quantityToAdd, product.productquantity),
        });
      }
    },

    LoadCart: (state, action) => {
      state.Cart = action.payload;
    },

    ClearCart: (state) => {
      state.Cart = [];
    },
  },
});

export const { AddTocart, LoadCart, ClearCart } = Cartslice.actions;
export default Cartslice.reducer;