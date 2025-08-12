import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hawkers: [],
    LoginHawker:[]
}

export const Hawkerslice = createSlice({
    name: "Hawkerslice",
    initialState,
    reducers: {
        AddHawkers: (state, action) => {
           state.users = action.payload;
        },
        Loadhawkers:(state,action)=>{
            state.hawkers = action.payload;
        },
        LoadLoginhawker:(state,action)=>{
            state.LoginHawker = action.payload;
        }
    }
})

export const {AddHawkers,Loadhawkers,LoadLoginhawker} = Hawkerslice.actions;
export default Hawkerslice.reducer;