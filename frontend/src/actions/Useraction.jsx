import { toast } from "react-toastify";
import { AddUsers, loadloginuser, Loadusers } from "../slices/Userslice";
import API from "../api";

export const registeruser = (newuser) => async (dispatch) => {
   try {
      const res = await API.post("/api/users", newuser);
      if (res?.data) {
         dispatch(AddUsers(res.data));
         toast.success("User Registered Successfully");
      }
   } catch (error) {
      console.error("Registration Error:", error);
      toast.error("Registration Failed");
   }
};

export const Loginuser = (user) => async (dispatch) => {
   try {
      localStorage.setItem("loginuser", JSON.stringify(user));
      dispatch(loadloginuser(user));
      toast.success("Login Successful");
   } catch (error) {
      console.error("Login Error:", error);
      toast.error("Login Failed");
   }
};

export const LoadLoginuser = () => async (dispatch) => {
   try {
      const storedUser = JSON.parse(localStorage.getItem("loginuser"))||[];

      if (storedUser.usertype == "admin") {
         dispatch(loadloginuser(storedUser));
         return;
      }

      if (!storedUser || !storedUser._id || !storedUser.usertype) {
         dispatch(loadloginuser([]));
         return;
      }
      const usertype = storedUser.usertype.toLowerCase();

      let res;

      switch (usertype) {
         case "hawker":
            res = await API.get(`/api/hawkers/${storedUser._id}`);
            break;
         case "wholesaler":
            res = await API.get(`/api/wholesalers/${storedUser._id}`);
            break;
         case "semiwholesaler":
            res = await API.get(`/api/semiwholesalers/${storedUser._id}`);
            break;
         default:
            dispatch(loadloginuser([]));
            return;
      }
      
      dispatch(loadloginuser(res.data.data));
   } catch (error) {
      console.error("Load Login User Error:", error);
      localStorage.removeItem("loginuser");
      dispatch(loadloginuser([]));
   }
};

export const Logoutuser = () => async (dispatch) => {
   try {
      localStorage.removeItem("loginuser");
      dispatch(loadloginuser([]));
      toast.info("Logged out successfully");
   } catch (error) {
      console.log(error);
   }
};

export const getusers = () => async (dispatch) => {
   try {
      const res = await API.get("/api/users");
      dispatch(Loadusers(res.data));
   } catch (error) {
      console.error("Get Users Error:", error);
      toast.error("Failed to load users");
   }
};