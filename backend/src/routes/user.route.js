import express from "express"
import { loadloginuser, logoutuser } from "../controllers/user.controller.js";
import { authenticateuser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/loadloginuser", authenticateuser, loadloginuser);

router.post("/logoutuser",logoutuser);

export default router;