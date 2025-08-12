import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Wholesalers: [],
    LoginWholesaler:[],
    wholesalerproducts:[],
}

export const Wholesalerslice = createSlice({
    name: "Wholesalerslice",
    initialState,
    reducers: {
        AddWholesaler: (state, action) => {
           state.Wholesalers = action.payload;
        },
        LoadWholesalers:(state,action)=>{
            state.Wholesalers = action.payload;
        },
        LoadLoginWholesaler:(state,action)=>{
            state.LoginWholesaler = action.payload;
        },
        Loadwholesalerproducts:(state,action)=>{
            state.wholesalerproducts = action.payload;
        },
    }
})

export const {AddWholesaler,LoadWholesalers,LoadLoginWholesaler,Loadwholesalerproducts} = Wholesalerslice.actions;
export default Wholesalerslice.reducer;