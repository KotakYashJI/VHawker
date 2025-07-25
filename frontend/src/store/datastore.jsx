import { configureStore } from "@reduxjs/toolkit"
import UserSlice from "../slices/Userslice"
import Productslice from "../slices/Productslice"
import Hawkerslice from "../slices/Hawkerslice"
import Semiwholesalerslice from "../slices/Semiwholesalerslice"
import Wholesalerslice from "../slices/Wholesalerslice"
import Cartslice from "../slices/Cartslice"
import Adminslice from "../slices/Adminslice"
import Contactslice from "../slices/Contactslice"

export const Store = configureStore({
    reducer: {
        user: UserSlice,
        hawker: Hawkerslice,
        semiwholesaler: Semiwholesalerslice,
        wholesaler: Wholesalerslice,
        admin: Adminslice,
        product: Productslice,
        cart: Cartslice,
        contact: Contactslice,
    }
})