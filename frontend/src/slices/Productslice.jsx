import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    singleproduct:[]
}

const Productslice = createSlice({
    name: "Productslice",
    initialState,
    reducers: {
        LoadProducts:(state,action)=>{
            state.products = action.payload;
        },
        LoadSingleproduct:(state,action)=>{
            state.singleproduct = action.payload;
        }
    }
})

export const { AddProduct,LoadProducts,LoadSingleproduct } = Productslice.actions;
export default Productslice.reducer;