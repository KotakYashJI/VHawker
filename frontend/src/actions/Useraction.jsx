import { toast } from "react-toastify";
import { AddUsers, loadloginuser, Loadusers } from "../slices/Userslice";
import API from "../api";
import axios from "axios";

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
      dispatch(Loginuser(user));
      toast.success("Login Successful");
   } catch (error) {
      console.error("Login Error:", error);
      toast.error("Login Failed");
   }
};

export const LoadLoginuser = () => async (dispatch) => {
   try {
      const response = await API.get("/api/users/loadloginuser");
      console.log(response);
      dispatch(loadloginuser(response.data.loginuser));
   } catch (error) {
      console.log(error);
   }
};

export const Logoutuser = () => async (dispatch) => {
   try {
      const response = await API.post("/api/users/logoutuser");
      dispatch(loadloginuser(null));
      toast.info(response.data.message);
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