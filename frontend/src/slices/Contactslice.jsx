import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Contacts: []
};

export const Contactslice = createSlice({
  name: "Contactslice",
  initialState,
  reducers: {
    AddToContact: (state, action) => {
      state.Contacts = action.payload;
    },
    LoadContacts: (state, action) => {
      state.Contacts = action.payload;
    },
  },
});

export const { AddToContact,LoadContacts } = Contactslice.actions;
export default Contactslice.reducer;