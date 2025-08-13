import Semiwholesalermodel from "../models/semiwholesaler.model.js";
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs";

export const registersemiwholesaler = async (req, res) => {
    try {
        const { username, email, password, city } = req.body;
        const user = await Semiwholesalermodel.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });
        if (user) return res.status(400).json("Semiwholesaler Already exist");
        const hashpassword = await bcryptjs.hash(password, 10);
        const newuser = await Semiwholesalermodel.create({
            username: username,
            email: email,
            password: hashpassword,
            city: city
        });
        const usertoken = { id: newuser._id, usertype: "semiwholesaler" };
        const token = jwt.sign(usertoken, process.env.JWT_TOKEN);
        res.cookie("token", token);
        res.status(201).json({
            message: "User Register",
            newuser
        })
    } catch (error) {
        res.status(500).json(error);
    }
};

export const loginsemiwholesaler = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Semiwholesalermodel.findOne({
            email: email
        }
        );
        if (!user) return res.status(400).json({ message: "User Not Found" });
        const isexistpassword = await bcryptjs.compare(password, user.password);
        if (!isexistpassword) return res.status(400).json({ message: "Invalid Password" });
        const usertoken = { id: user._id, usertype: user.usertype };
        const token = jwt.sign(usertoken, process.env.JWT_TOKEN);
        res.cookie("token", token);
        res.status(200).json({
            message: "User Login",
            user
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const getallsemiwholesalerproducts = async (req, res) => {
    try {
        const allsemiwholesalerproducts = await Semiwholesalermodel.find().populate("products");
        res.json(allsemiwholesalerproducts);
    } catch (error) {
        res.json({
            message: "no products found"
        })
    }
};

export const getsingleproduct = async (req, res) => {
    try {
        const productid = req.params.id;
        const sellerid = req.params.sellerid;
        const crrsemiwholesaler = await Semiwholesalermodel.find({ _id: sellerid });
        console.log(crrsemiwholesaler[0].products);
        crrsemiwholesaler[0].products.filter((crrproduct) => {
            if (crrproduct.id === productid) {
                res.status(201).json(crrproduct);
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

export const getallproducts = async (req, res) => {
    try {
        const userid = req.params.id;
        const Semisemiwholesaler = await Semiwholesalermodel.find({ _id: userid });
        res.status(201).json(Semisemiwholesaler);
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
};

export const getallsemiwholesalers = async (req, res) => {
    try {
        const semisemiwholesalers = await Semiwholesalermodel.find();
        console.log(semisemiwholesalers);
        res.status(200).json(semisemiwholesalers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
};

export const getsinglesemiwholesaler = async (req, res) => {
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
};

export const updateallproducts = async (req, res) => {
    try {
        const userId = req.params.id;
        const orderdata = req.body.updatedorder;
        const buyertype = req.body.buyertype;

        const semiwholesaler = await Semiwholesalermodel.findById(userId);
        if (!semiwholesaler) {
            return res.status(404).json({ message: "Semi-wholesaler not found" });
        }

        let updatedProducts = [...semiwholesaler.products];

        orderdata.forEach((orderProduct) => {
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
};

export const updatesingleproduct = async (req, res) => {
    try {
        const userid = req.params._id;
        const productid = req.params.id;
        const { productimg, productname, productprice, productquantity, description } = req.body;
        const updatedsemiwholesaler = await Semiwholesalermodel.findOneAndUpdate(
            { _id: userid, "products.id": productid },
            {
                $set: {
                    "products.$.productimg": productimg,
                    "products.$.productname": productname,
                    "products.$.productprice": Number(productprice),
                    "products.$.productquantity": Number(productquantity),
                    "products.$.description": description,
                },
            },
            { new: true }
        )
        res.status(201).json(updatedsemiwholesaler);
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
};

export const updatesemiwholesaler = async (req, res) => {
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
};