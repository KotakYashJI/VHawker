import { toast } from "react-toastify";
import { AddHawkers, LoadLoginhawker, Loadhawkers } from "../slices/Hawkerslice";
import API from "../api";
import { loadloginuser } from "../slices/Userslice";

export const registerhawker = (newhawker) => async (dispatch) => {
   try {
      const response = await API.post("http://localhost:8080/api/hawkers", newhawker);
      dispatch(loadloginuser(response.data.newuser));
      toast.success(response.data.message);
   } catch (error) {
      console.error("Registration Error:", error);
      toast.error("registration failed.");
   }
};

export const LoginHawker = (hawker) => async (dispatch) => {
   let loginhawker;
   try {
      loginhawker = await API.post("http://localhost:8080/api/hawkers/login", hawker);
      dispatch(loadloginuser(loginhawker.data.user));
      toast.success(loginhawker.data.message);
   } catch (error) {
      toast.error(error?.response?.data?.message);
   }
};

export const LoadAllHawkers = () => async (dispatch) => {
   try {
      const hawkers = await API.get("/api/hawkers");
      dispatch(Loadhawkers(hawkers.data));
   } catch (error) {
      console.error("Fetching Hawkers Error:", error);
   }
};
