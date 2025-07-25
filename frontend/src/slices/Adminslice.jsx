import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Admin: []
}

export const Adminslice = createSlice({
    name: "Adminslice",
    initialState,
    reducers: {
        Loginadmin: (state, action) => {
           state.Admin = action.payload;
        },
        LoadAdmin:(state,action)=>{
            state.Admin = action.payload;
        }
    }
})

export const {Loginadmin,LoadAdmin} = Adminslice.actions;
export default Adminslice.reducer;