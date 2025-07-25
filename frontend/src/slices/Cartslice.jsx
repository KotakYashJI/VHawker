import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Cart: [],
};

export const Cartslice = createSlice({
  name: "Cartslice",
  initialState,
  reducers: {
    AddTocart: (state, action) => {
      state.Cart = action.payload;
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