import express from "express"
import { getallhawkers, getsignlehawker, registerhawker, updatehawker } from "../controllers/hawker.controller.js";

const router = express.Router();

router.post("/", registerhawker);

router.get("/", getallhawkers)

router.get("/:id", getsignlehawker)

router.patch("/:id", updatehawker)

export default router;