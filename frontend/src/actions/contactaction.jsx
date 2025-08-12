import { toast } from "react-toastify"
import API from "../api";
import { AddToContact, LoadContacts } from "../slices/Contactslice"

export const addcontact = (data) => async (dispatch) => {
  try {
    const contactuser = await API.post("/api/contacts", data);
    dispatch(AddToContact(contactuser.data.data))
    toast.success("We Will Call You Later!");
  } catch (error) {
    toast.error(error);
  }
}

export const getallcontacts = () => async (dispatch) => {
  try {
    const contactuser = await API.get("/api/contacts");
    dispatch(LoadContacts(contactuser.data));
  } catch (error) {
    toast.error(error);
  }
}

export const deletecontact = (id) => async (dispatch) => {
  try {
    await API.delete(`/api/contacts/${id}`);
    const contactuser = await API.get("/api/contacts");
    dispatch(LoadContacts(contactuser.data));
  } catch (error) {
    toast.error(error);
  }
}