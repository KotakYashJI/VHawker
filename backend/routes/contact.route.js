import express from "express"
import Contacmodel from "../models/contact.model.js"
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const contacteduser = await Contacmodel.create(req.body);
        res.status(201).json({
            message: "Data Send",
            data: contacteduser
        })
    } catch (error) {
        res.status(500).json({
            message: error,
        })
    }
});

router.get("/", async (req, res) => {
    try {
        const contactdata = await Contacmodel.find();
        res.status(200).json(contactdata);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const dataid = req.params.id;
        const contactdata = await Contacmodel.findOneAndDelete({_id:dataid});
        res.status(200).json(contactdata);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
})

export default router;