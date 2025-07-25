import express from "express"
import Ordermodel from "../models/order.mode.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { date, buyerId,buyertype, sellerId,sellertype, orderdata, } = req.body.orderdata;
        const neworder = await Ordermodel.create({
            orderdate: date,
            buyerid: buyerId,
            buyertype: buyertype,
            sellerid: sellerId,
            sellertype: sellertype,
            orderdata: orderdata,
            paymentdata: req.body.paymentdetails
        });
        res.status(201).json(neworder);
    } catch (error) {
        res.status(500).json({
            message: "Order Not Add", error
        })
    }
})

router.get("/", async (req, res) => {
    try {
        const allorders = await Ordermodel.find();
        res.status(201).json(allorders);
    } catch (error) {
        res.status(500).json({
            message: "No order found"
        })
    }
})

export default router;