import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Semiwholesaler: [],
    LoginSemiwholesaler:[]
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
        }
    }
})

export const {AddSemiwholesaler,LoadSemiwholesalers,Loadloginsemiwholesaler} = Semiwholesalerslice.actions;
export default Semiwholesalerslice.reducer;