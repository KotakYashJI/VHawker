import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Semiwholesaler: [],
    LoginSemiwholesaler:[],
    semiwholesalerproducts:[]
}

export const Semiwholesalerslice = createSlice({
    name: "Semiwholesaler",
    initialState,
    reducers: {
        AddSemiwholesaler: (state, action) => {
           state.Semiwholesaler = action.payload;
        },
        LoadSemiwholesalers:(state,action)=>{
            state.Semiwholesaler = action.payload;
        },
        Loadloginsemiwholesaler:(state,action)=>{
            state.LoginSemiwholesaler = action.payload;
        },
        Loadsemiwholesalerproducts:(state,action)=>{
            state.semiwholesalerproducts = action.payload;
        },
    }
})

export const {AddSemiwholesaler,LoadSemiwholesalers,Loadloginsemiwholesaler,Loadsemiwholesalerproducts} = Semiwholesalerslice.actions;
export default Semiwholesalerslice.reducer;