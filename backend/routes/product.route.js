import express from "express";
import Productmodel from "../models/product.model.js";
import { createproduct, deleteproduct, getallproducts, getsingleproduct, updateproduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createproduct)

router.get("/", getallproducts)

router.get("/:id", getsingleproduct)

router.patch("/:id", updateproduct)

router.delete("/:id", deleteproduct)

export default router;