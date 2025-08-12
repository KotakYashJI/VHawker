import { toast } from "react-toastify";
import {
  AddSemiwholesaler,
  Loadloginsemiwholesaler,
  LoadSemiwholesalers,
  Loadsemiwholesalerproducts
} from "../slices/Semiwholesalerslice";
import API from "../api";
import { LoadLoginuser } from "./Useraction";

export const registerSemiwholesaler = (newsemiwholesaler) => async (dispatch) => {
  try {
    const allsemiwholesalers = await API.get("/api/semiwholesalers");
    if (allsemiwholesalers.data.length > 0) {
      const crrsemiwholesaler = allsemiwholesalers.data.find((semiwholesaler) => semiwholesaler?.email == newsemiwholesaler?.email);
      if (crrsemiwholesaler?.email == undefined || crrsemiwholesaler?.email == "undefined") {
        const res = await API.post("/api/semiwholesalers", newsemiwholesaler);
        if (res?.data) {
          dispatch(AddSemiwholesaler(res.data));
          localStorage.setItem("loginuser", JSON.stringify(res.data.data));
          dispatch(LoadLoginuser());
          toast.success("Registered Successfully");
        }
      }
      else toast.error("already reqistered");
    }
    else {
      const res = await API.post("/api/semiwholesalers", newsemiwholesaler);
      if (res?.data) {
        dispatch(AddSemiwholesaler(res.data));
        localStorage.setItem("loginuser", JSON.stringify(res.data.data));
        toast.success("Registered Successfully");
      }
    }
  } catch (error) {
    console.error("Registration Error:", error);
    toast.error("registration failed.");
  }
};

export const LoginSemiwholesaler = (semiwholesaler) => async (dispatch) => {
  try {
    if (!semiwholesaler?._id) throw new Error("Invalid login data");
    localStorage.setItem("loginuser", JSON.stringify(semiwholesaler));
    dispatch(Loadloginsemiwholesaler(semiwholesaler));
  } catch (error) {
    console.error("Login Error:", error);
    toast.error("Login failed.");
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

export const LogoutSemiwholesaler = () => async (dispatch) => {
  try {
    localStorage.removeItem("loginuser");
    dispatch(Loadloginsemiwholesaler(null));
    toast.error("User Logged Out");
  } catch (error) {
    console.error("Logout Error:", error);
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