import API from "./index";

export const registerSemiWholesaler = (data) => API.post("/semiwholesalers", data);
export const getSemiWholesalers = () => API.get("/semiwholesalers");
export const getSingleSemiWholesaler = (id) => API.get(`/semiwholesalers/${id}`);
