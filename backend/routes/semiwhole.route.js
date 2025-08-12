import express from "express"
import {getallproducts, getallsemiwholesalerproducts, getallsemiwholesalers, getsingleproduct, getsinglesemiwholesaler, registersemiwholesaler, updateallproducts, updatesemiwholesaler, updatesingleproduct} from "../controllers/semiwholesaler.controller.js"
const router = express.Router();

router.post("/",registersemiwholesaler);

router.get("/products", getallsemiwholesalerproducts);

router.get("/:sellerid/products/:id", getsingleproduct);

router.get("/:id/products", getallproducts);

router.get("/", getallsemiwholesalers);

router.get("/:id", getsinglesemiwholesaler);

router.patch("/:id/products", updateallproducts);

router.patch("/:_id/products/:id", updatesingleproduct);

router.patch("/:id", updatesemiwholesaler);

export default router;