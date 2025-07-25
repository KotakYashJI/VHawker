import { toast } from "react-toastify";
import { Loginadmin, LoadAdmin } from "../slices/Adminslice"

export const loginadmin = (admin) => async (dispatch) => {
    try {
        localStorage.setItem("loginuser", JSON.stringify(admin));
        dispatch(Loginadmin(admin));
        toast.success("Login Successful");
    } catch (error) {
        console.log(error);
    }
}

export const LoadLoginadmin = () => (dispatch) => {
    const loginadmin = JSON.parse(localStorage.getItem("loginuser"));
    dispatch(LoadAdmin(loginadmin));
}