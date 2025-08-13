import { toast } from "react-toastify";
import API from "../api";
import { LoadLoginWholesaler, LoadWholesalers } from "../slices/Wholesalerslice";
import { LoadSingleproduct } from "../slices/Productslice";
import { Loadwholesalerproducts } from "../slices/Wholesalerslice";
import { loadloginuser } from "../slices/Userslice";

export const registerwholesaler = (newwholesaler) => async (dispatch) => {
   try {
      const response = await API.post("/api/wholesalers", newwholesaler);
      dispatch(loadloginuser(response.data.newuser));
      toast.success(response.data.message);
   } catch (error) {
      console.error("Registration Error:", error);
      toast.error("registration failed.");
   }
};

export const LoginWholesaler = (wholesaler) => async (dispatch) => {
   try {
      const loginwholesaler = await API.post("/api/wholesalers/login", wholesaler);
      dispatch(loadloginuser(user.data.user));
      toast.success(loginwholesaler.data.message);
   } catch (error) {
      toast.error(error?.response?.data?.message);
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
