import API from "./index";

export const fetchorders = () => API.get("/orders");
