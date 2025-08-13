import { toast } from "react-toastify";
import {
  Loadloginsemiwholesaler,
  LoadSemiwholesalers,
  Loadsemiwholesalerproducts
} from "../slices/Semiwholesalerslice";
import API from "../api";
import { loadloginuser } from "../slices/Userslice";

export const registerSemiwholesaler = (newsemiwholesaler) => async (dispatch) => {
  try {
    const response = await API.post("/api/semiwholesalers", newsemiwholesaler);
    dispatch(loadloginuser(response.data.newuser));
    toast.success(response.data.message);
  } catch (error) {
    console.error("Registration Error:", error);
    toast.error("registration failed.");
  }
};

export const LoginSemiwholesaler = (semiwholesaler) => async (dispatch) => {
  try {
    const loginsemiwholesaler = await API.post("/api/semiwholesalers/login", semiwholesaler);
    dispatch(loadloginuser(loginsemiwholesaler.data.user));
    toast.success(loginsemiwholesaler.data.message);
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
};

export const LoadloginSemiwholesaler = () => async (dispatch) => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("loginuser"));
    if (storedUser?.usertype?.toLowerCase() === "semiwholesaler") {
      const response = await API.get(`/api/semiwholesalers/${storedUser._id}`);
      dispatch(Loadloginsemiwholesaler(response.data.data));
    } else {
      dispatch(Loadloginsemiwholesaler(null));
    }
  } catch (error) {
    console.error("Load Semiwholesaler Error:", error);
    localStorage.removeItem("loginuser");
  }
};

export const GetallSemiwholesalerProducts = () => async (dispatch) => {
  try {
    const products = await API.get("/api/semiwholesalers/products");
    dispatch(Loadsemiwholesalerproducts(products.data));
  } catch (error) {
    console.log(error);
  }
};

export const LoadAllSemiwholesaler = () => async (dispatch) => {
  try {
    const res = await API.get("/api/semiwholesalers");
    console.log(res);
    dispatch(LoadSemiwholesalers(res.data));
  } catch (error) {
    console.error("Fetching Semiwholesalers Error:", error);
  }
};