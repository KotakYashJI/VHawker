import axios from "axios";

const API = axios.create({
  baseURL: "https://vhawker-backend.onrender.com"
});

export default API;