import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Wholesalers: [],
    LoginWholesaler:[]
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
        }
    }
})

export const {AddWholesaler,LoadWholesalers,LoadLoginWholesaler} = Wholesalerslice.actions;
export default Wholesalerslice.reducer;