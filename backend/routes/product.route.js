import express from "express";
import Productmodel from "../models/product.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        await Productmodel.create(req.body);
        res.status(201).json({ message: "Product Created Successfully!" })
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.get("/", async (req, res) => {
    try {
        const products = await Productmodel.find();
        res.status(201).json({
            message: "User Getting",
            data: products
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const singleproduct = await Productmodel.findOne({ _id: id });
        res.status(201).json({
            message: "Product Found",
            data: singleproduct
        });
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { productimg, productname, productprice,
            productquantity, description } = req.body;
        const newproduct = await Productmodel.findOneAndUpdate(
            { _id: id },
            {
                productimg: productimg,
                productname: productname,
                productprice: productprice,
                productquantity: productquantity,
                description: description,
            }
        )
        res.status(201).json({
            message: "Product Updated",
            data: newproduct
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Productmodel.findOneAndDelete({ _id: id });
        res.status(201).json({message:"Product Deleted",data:product})
    } catch (error) {
        res.status(500).json({message:"Product not Deleted",error});
    }
})

export default router;