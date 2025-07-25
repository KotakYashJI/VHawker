import API from "./index";

export const fetchContacts = () => API.get("/contacts");
