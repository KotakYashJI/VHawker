import express from "express"
import Semiwholesalermodel from "../models/semiwholesaler.model.js";
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const semiwholesaler = await Semiwholesalermodel.create(req.body);
        res.status(201).json({
            message: "Semiwholesaler Register",
            data: semiwholesaler
        })
    } catch (error) {
        res.status(500).json({
            message: error,
        })
    }
});

router.get("/:id/products", async (req, res) => {
    try {
        const userid = req.params.id;
        const Semiwholesaler = await Semiwholesalermodel.find({ _id: userid });
        res.status(201).json(Semiwholesaler);
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

router.get("/", async (req, res) => {
    try {
        const semiwholesalers = await Semiwholesalermodel.find();
        res.status(200).json(semiwholesalers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const loginsemiwholesaler = await Semiwholesalermodel.findById({ _id: id });
        if (loginsemiwholesaler) {
            res.status(201).json({
                message: "Semiwholesaler Found",
                data: loginsemiwholesaler
            })
        }
        else {
            res.status(500).json({
                message: "semiwholesaler Not Found",
                data: loginhawker
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "semiwholesaler Not Found", error
        })
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { username, email, password,
            usertype, cart } = req.body;
        const updatedsemiwholesalers = await Semiwholesalermodel.findOneAndUpdate(
            { _id: id },
            {
                username: username,
                email: email,
                password: password,
                cart: cart,
                usertype: usertype,
            }
        )
        res.status(201).json({
            message: "Semiwholesaler Updated",
            data: updatedsemiwholesalers
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

export default router;