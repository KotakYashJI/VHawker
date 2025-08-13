import Ordermodel from "../models/order.mode.js";

export const createorder = async (req, res) => {
    try {
        const date = req.body.date;

        const { sellerId, sellertype } = req.body.sellerdata;
        const { buyerId, buyertype } = req.body.buyerdata;

        const neworder = await Ordermodel.create({
            orderdate: date,
            buyerid: buyerId,
            buyertype: buyertype,
            sellerid: sellerId,
            sellertype: sellertype,
            orderdata: req.body.updatedorder,
            paymentdata: req.body.paymentdetails
        });
        res.status(201).json(neworder);
    } catch (error) {
        res.status(500).json({
            message: "Order Not Add", error
        })
    }
}

export const getallorders = async (req, res) => {
    try {
        const allorders = await Ordermodel.find();
        res.status(201).json(allorders);
    } catch (error) {
        res.status(500).json({
            message: "No order found"
        })
    }
}