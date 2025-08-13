import express from "express"
import { loadloginuser, logoutuser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/loadloginuser", loadloginuser);

router.post("/logoutuser",logoutuser);

export default router;