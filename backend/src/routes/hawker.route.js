import express from "express"
import { getallhawkers, loginhawker, registerhawker, updatehawker } from "../controllers/hawker.controller.js";

const router = express.Router();

router.post("/", registerhawker);

router.post("/login",loginhawker);

router.get("/", getallhawkers)

router.patch("/:id", updatehawker)

export default router;