import express from "express"
import { deleteproduct, getallwholesaler, getallwholesalerproducts, getsingleproduct, getsinglewholesaler, loginwholesaler, registerwholesaler, updateallproducts, updatesingleproduct, updatewholesaler } from "../controllers/wholesaler.controller.js";

const router = express.Router();

router.post("/", registerwholesaler);

router.get("/:sellerid/products/:id", getsingleproduct);

router.get("/", getallwholesaler);

router.get("/:id", getsinglewholesaler);

router.get("/products", getallwholesalerproducts);

router.post("/login",loginwholesaler);

router.patch("/:_id/products/:id", updatesingleproduct);

router.patch("/:_id/products", updateallproducts);

router.delete("/:_id/products/:productid", deleteproduct);

router.patch("/:id", updatewholesaler);

export default router;