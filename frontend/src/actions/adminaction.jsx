import { toast } from "react-toastify";
import { loadloginuser } from "../slices/Userslice";
import API from "../api";

export const loginadmin = (admin) => async (dispatch) => {
    let adminlogin;
    try {
        adminlogin = await API.post("http://localhost:8080/api/admin/login", admin);
        dispatch(loadloginuser(adminlogin.data.data));
        toast.success(adminlogin.data.message);
    } catch (error) {
        toast.error(error.message);
    }
};