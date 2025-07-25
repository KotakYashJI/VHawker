import { toast } from "react-toastify"
import API from "../api";
import axios from "axios";
import { AddToContact, LoadContacts } from "../slices/Contactslice"

export const addcontact = (data) => async (dispatch) => {
  try {
    const contactuser = await axios.post("http://localhost:8080/api/contacts", data);
    dispatch(AddToContact(contactuser.data.data))
    toast.success("We Will Call You Later!");
  } catch (error) {
    toast.error(error);
  }
}

export const getallcontacts = () => async (dispatch) => {
  try {
    const contactuser = await axios.get("http://localhost:8080/api/contacts");
    dispatch(LoadContacts(contactuser.data));
  } catch (error) {
    toast.error(error);
  }
}

export const deletecontact = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8080/api/contacts/${id}`);
    const contactuser = await axios.get("http://localhost:8080/api/contacts");
    dispatch(LoadContacts(contactuser.data));
  } catch (error) {
    toast.error(error);
  }
}