import express from "express"
import Semiwholesalermodel from "../models/semiwholesaler.model.js";
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const semisemiwholesaler = await Semiwholesalermodel.create(req.body);
        res.status(201).json({
            message: "Semisemiwholesaler Register",
            data: semisemiwholesaler
        })
    } catch (error) {
        res.status(500).json({
            message: error,
        })
    }
});

router.get("/products", async (req, res) => {
    try {
        const allsemiwholesalerproducts = await Semiwholesalermodel.find().populate("products");
        res.json(allsemiwholesalerproducts);
    } catch (error) {
        res.json({
            message: "no products found"
        })
    }
})

router.get("/:sellerid/products/:id", async (req, res) => {
    try {
        const productid = req.params.id;
        const sellerid = req.params.sellerid;
        const crrsemiwholesaler = await Semiwholesalermodel.find({ _id: sellerid });
        res.status(201).json(crrsemiwholesaler);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

router.get("/:id/products", async (req, res) => {
    try {
        const userid = req.params.id;
        const Semisemiwholesaler = await Semiwholesalermodel.find({ _id: userid });
        res.status(201).json(Semisemiwholesaler);
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

router.get("/", async (req, res) => {
    try {
        const semisemiwholesalers = await Semiwholesalermodel.find();
        console.log(semisemiwholesalers);
        res.status(200).json(semisemiwholesalers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const loginsemisemiwholesaler = await Semiwholesalermodel.findById({ _id: id });
        if (loginsemisemiwholesaler) {
            res.status(201).json({
                message: "Semisemiwholesaler Found",
                data: loginsemisemiwholesaler
            })
        }
        else {
            res.status(500).json({
                message: "semisemiwholesaler Not Found",
                data: loginhawker
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "semisemiwholesaler Not Found", error
        })
    }
})

router.patch("/:id/products", async (req, res) => {
    try {
        const userId = req.params.id;
        const orderdata = req.body.orderdata;
        const buyertype = req.body.buyertype;

        const semiwholesaler = await Semiwholesalermodel.findById(userId);
        if (!semiwholesaler) {
            return res.status(404).json({ message: "Semi-wholesaler not found" });
        }

        let updatedProducts = [...semiwholesaler.products];

        orderdata.orderdata.forEach((orderProduct) => {
            const index = updatedProducts.findIndex((product) => product.id === orderProduct.id);
            const orderQty = Number(orderProduct.productquantity);

            if (index !== -1) {
                const currentQty = Number(updatedProducts[index].productquantity);

                const updatedQty =
                    buyertype === "semiwholesaler"
                        ? currentQty + orderQty
                        : currentQty > 0 ? currentQty - orderQty : 0;

                updatedProducts[index] = {
                    ...updatedProducts[index],
                    productquantity: updatedQty,
                };
            } else {
                updatedProducts.push({
                    ...orderProduct,
                    productquantity: Number(orderProduct.productquantity),
                });
            }
        });

        semiwholesaler.products = updatedProducts;
        await semiwholesaler.save();

        res.status(200).json({
            message: "Product quantities updated successfully",
            data: semiwholesaler.products,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { username, email, password,
            usertype, cart } = req.body;
        const updatedsemisemiwholesalers = await Semiwholesalermodel.findOneAndUpdate(
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
            message: "Semisemiwholesaler Updated",
            data: updatedsemisemiwholesalers
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

export default router;