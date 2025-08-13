import express from "express"
import {createcontact,getallcontacts,deletecontact} from "../controllers/contact.controller.js"
const router = express.Router();

router.post("/", createcontact);

router.get("/", getallcontacts)

router.delete("/:id", deletecontact)

export default router;