import express from "express";
import {createproducts, deleteproduct, getallproducts, getsingleproduct, updateproduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createproducts)

router.get("/", getallproducts)

router.get("/:id", getsingleproduct)

router.patch("/:id", updateproduct)

router.delete("/:id", deleteproduct)

export default router;