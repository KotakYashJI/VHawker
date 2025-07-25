import express from "express"
import Usermodel from "../models/user.model.js";
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        await Usermodel.create(req.body);
        res.status(201).json({
            message: "User Register",
            data: req.body
        })
    } catch (error) {
        res.status(500).json({
            message: error,
        })
    }
});

router.get("/", async (req, res) => {
    try {
        const users = await Usermodel.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const loginuser = await Usermodel.findById({ _id: id });
        if (loginuser) {
            res.status(201).json({
                message: "User Found",
                data: loginuser
            })
        }
        else {
            res.status(500).json({
                message: "User Not Found",
                data: loginuser
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
        const updateduser = await Usermodel.findOneAndUpdate(
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
            message: "Product Added",
            data: updateduser
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

export default router;