import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Loginuser:[]
}

export const Userslice = createSlice({
    name: "Userslice",
    initialState,
    reducers: {
        AddUsers: (state, action) => {
           state.users = action.payload;
        },
        loadloginuser:(state,action)=>{
            state.Loginuser = action.payload;
        }
    }
})

export const {AddUsers,Loadusers,loadloginuser} = Userslice.actions;
export default Userslice.reducer;