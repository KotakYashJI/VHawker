import express from "express"
import { createorder, getallorders } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createorder)

router.get("/", getallorders)

export default router;