import { toast } from "react-toastify";
import { AddHawkers, LoadLoginhawker, Loadhawkers } from "../slices/Hawkerslice";
import API from "../api";
import { LoadLoginuser } from "./Useraction";

export const registerhawker = (newhawker) => async (dispatch) => {
   try {
      const allhawkers = await API.get("/api/hawkers");
      if (allhawkers.data.length > 0) {
         const crrhawker = allhawkers.data.find((hawker) => hawker?.email == newhawker?.email);
         if (crrhawker?.email == undefined || crrhawker?.email == "undefined") {
            const res = await API.post("/api/hawkers", newhawker);
            if (res?.data) {
               dispatch(AddHawkers(res.data));
               localStorage.setItem("loginuser", JSON.stringify(res.data.data));
               dispatch(LoadLoginuser());
               toast.success("Registered Successfully");
            }
         }
         else toast.error("already reqistered");
      }
      else {
         const res = await API.post("/api/hawkers", newhawker);
         if (res?.data) {
            dispatch(AddHawkers(res.data));
            localStorage.setItem("loginuser", JSON.stringify(res.data.data));
            toast.success("Registered Successfully");
         }
      }
   } catch (error) {
      console.error("Registration Error:", error);
      toast.error("registration failed.");
   }
};

export const LoginHawker = (hawker) => async (dispatch) => {
   try {
      if (!hawker?._id || !hawker?.usertype) {
         throw new Error("Invalid login data.");
      }
      localStorage.setItem("loginuser", JSON.stringify(hawker));
      dispatch(LoadLoginhawker(hawker));
   } catch (error) {
      console.error("Login Error:", error);
      toast.error("Login failed.");
   }
};

export const Loadloginhawker = () => async (dispatch) => {
   try {
      const logedinuser = JSON.parse(localStorage.getItem("loginuser"));
      if (logedinuser?.usertype?.toLowerCase() === "hawker") {
         const loginuser = await API.get(`/api/hawkers/${logedinuser._id}`);
         dispatch(LoadLoginhawker(loginuser.data.data));
      } else {
         dispatch(LoadLoginhawker(null));
      }
   } catch (error) {
      console.error("Load Login Hawker Error:", error);
      localStorage.removeItem("loginuser");
   }
};

export const Logoutuser = () => async (dispatch) => {
   try {
      localStorage.removeItem("loginuser");
      dispatch(LoadLoginhawker(null));
      toast.error("User Logout");
   } catch (error) {
      console.error("Logout Error:", error);
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
