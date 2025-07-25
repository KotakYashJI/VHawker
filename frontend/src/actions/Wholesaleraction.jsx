import { toast } from "react-toastify";
import API from "../api";
import { AddWholesaler, LoadLoginWholesaler, LoadWholesalers } from "../slices/Wholesalerslice";
import { LoadSingleproduct } from "../slices/Productslice";
import { Loadwholesalerproducts } from "../slices/Wholesalerslice";
import { LoadLoginuser } from "./Useraction";

export const registerwholesaler = (newwholesaler) => async (dispatch) => {
   try {
      const allwholesalers = await API.get("/api/wholesalers");
      if (allwholesalers.data.length > 0) {
         const crrwholesaler = allwholesalers.data.find((wholesaler) => wholesaler?.email == newwholesaler?.email);
         if (crrwholesaler?.email == undefined || crrwholesaler?.email == "undefined") {
            const res = await API.post("/api/wholesalers", newwholesaler);
            if (res?.data) {
               dispatch(AddWholesaler(res.data));
               localStorage.setItem("loginuser", JSON.stringify(res.data.data));
               dispatch(LoadLoginuser());
               toast.success("Registered Successfully");
            }
         }
         else toast.error("already reqistered");
      }
      else {
         const res = await API.post("/api/wholesalers", newwholesaler);
         if (res?.data) {
            dispatch(AddWholesaler(res.data));
            localStorage.setItem("loginuser", JSON.stringify(res.data.data));
            toast.success("Registered Successfully");
         }
      }
   } catch (error) {
      console.error("Registration Error:", error);
      toast.error("registration failed.");
   }
};

export const LoginWholesaler = (wholesaler) => async (dispatch) => {
   try {
      localStorage.setItem("loginuser", JSON.stringify(wholesaler));
      dispatch(LoadLoginWholesaler(wholesaler));
   } catch (error) {
      console.log(error);
   }
};

export const LoadloginWholesaler = () => async (dispatch) => {
   try {
      const logedinWholesaler = JSON.parse(localStorage.getItem("loginuser"));
      const loginWholesaler = await API.get(`/api/wholesalers/${logedinWholesaler._id}`);
      dispatch(LoadLoginWholesaler(loginWholesaler.data.data));
   } catch (error) {
      localStorage.removeItem("loginuser");
      console.log(error);
   }
};

export const LogoutWholesaler = () => async (dispatch) => {
   try {
      localStorage.removeItem("loginuser");
      dispatch(LoadLoginWholesaler([]));
      toast.error("User Logout");
   } catch (error) {
      console.log(error);
   }
};

export const LoadAllWholesalers = () => async (dispatch) => {
   try {
      const wholesalers = await API.get("/api/wholesalers");
      dispatch(LoadWholesalers(wholesalers.data));
   } catch (error) {
      console.log(error);
   }
};

export const GetallWholesalerProducts = () => async (dispatch) => {
   try {
      const products = await API.get("/api/wholesalers/products");
      dispatch(Loadwholesalerproducts(products.data));
   } catch (error) {
      console.log(error);
   }
};

export const UpdateWholesalerProducts = (_id, id) => async (dispatch) => {
   try {
      const products = await API.get(`/api/wholesalers/${_id}/products/${id}`);
      dispatch(LoadSingleproduct(products.data.data));
   } catch (error) {
      console.log(error);
   }
};
