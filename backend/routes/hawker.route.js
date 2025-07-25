import express from "express"
import Hawkermodel from "../models/hawker.model.js";
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const hawker = await Hawkermodel.create(req.body);
        res.status(201).json({
            message: "Hawker Register",
            data: hawker
        })
    } catch (error) {
        res.status(500).json({
            message: error,
        })
    }
});

router.get("/", async (req, res) => {
    try {
        const hawkers = await Hawkermodel.find();
        res.status(200).json(hawkers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const loginhawker = await Hawkermodel.findById({ _id: id });
        if (loginhawker) {
            res.status(201).json({
                message: "Hawker Found",
                data: loginhawker
            })
        }
        else {
            res.status(500).json({
                message: "Hawker Not Found",
                data: loginhawker
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "User Not Found", error
        })
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { username, email, password,
             usertype, productstore } = req.body;
        const updatedhawker = await Hawkermodel.findOneAndUpdate(
            { _id: id },
            {
                username: username,
                email: email,
                password: password,
                usertype: usertype,
                productstore: productstore,
            }
        )
        res.status(201).json({
            message: "Hawker Updated",
            data: updatedhawker
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

export default router;