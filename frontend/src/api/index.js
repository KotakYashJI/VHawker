import axios from "axios";

const API = axios.create({
  baseURL: "https://vhawker-backend.onrender.com",
  withCredentials:true
});

export default API;