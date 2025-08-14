import express from "express"
import { loginadmin } from "../controllers/admin.controller.js"

const router = express.Router();

router.post("/login", loginadmin);

export default router;