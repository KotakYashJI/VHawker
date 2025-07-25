import API from "./index";

export const getWholesalers = () => API.get("/wholesalers");
export const getWholesalerById = (id) => API.get(`/wholesalers/${id}`);
export const updateWholesalerProduct = (id, product) =>
    API.patch(`/wholesalers/${id}`, product);
