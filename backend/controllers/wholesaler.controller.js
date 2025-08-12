import Wholesalermodel from "../models/wholesaler.model.js";

export const registerwholesaler =  async (req, res) => {
    try {
        const wholesaler = await Wholesalermodel.create(req.body);
        res.status(201).json({
            message: "Wholesaler Register",
            data: wholesaler
        })
    } catch (error) {
        res.status(500).json({
            message: error,
        })
    }
};

export const getsingleproduct =  async (req, res) => {
    try {
        const productid = req.params.id;
        const sellerid = req.params.sellerid;
        const crrwholesaler = await Wholesalermodel.findOne({ _id: sellerid });
        crrwholesaler.products.filter((crrproduct) => {
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

export const getallwholesaler = async (req, res) => {
    try {
        const wholesalers = await Wholesalermodel.find();
        res.status(200).json(wholesalers);
    } catch (error) {
        console.log(error);
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
};

export const getallproducts =  async (req, res) => {
    try {
        const userid = req.params.id;
        const wholesalerproducts = await Wholesalermodel.find({ _id: userid }).populate("products");
        res.status(201).json(wholesalerproducts);
    } catch (error) {
        console.log(error);
    }
};

// router.get("/:_id/products/:id", async (req, res) => {
//     try {
//         const _id = req.params._id;
//         const id = req.params.id;
//         const wholesaler = await Wholesalermodel.findOne({ _id: _id }).populate("products");
//         if (wholesaler) {
//             const wholesalerproduct = wholesaler.products.find((wholesaler) => wholesaler.id == id);
//             res.json({
//                 message: "Product get",
//                 data: wholesalerproduct
//             })
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })

export const updatesingleproduct =  async (req, res) => {
    try {
        const userid = req.params._id;
        const productid = req.params.id;
        const { productimg, productname, productprice, productquantity, description } = req.body;
        const updatedwholesaler = await Wholesalermodel.findOneAndUpdate(
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
        res.status(201).json(updatedwholesaler);
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
};

export const updateallproducts = async (req, res) => {
    try {
        const userid = req.params._id;
        const orderproducts = req.body;

        const wholesaler = await Wholesalermodel.findById(userid);

        wholesaler.products = wholesaler.products.map((product) => {
            const match = orderproducts.find((orproduct) => orproduct.id === product.id);

            if (match) {
                const currentQty = Number(product.productquantity);
                const orderQty = Number(match.productquantity);
                const updatedQty = Math.max(0, currentQty - orderQty);

                return {
                    ...product,
                    productquantity: updatedQty,
                };
            }
            return product;
        });

        await wholesaler.save();

        res.status(200).json({
            message: "Product quantities updated successfully",
            data: wholesaler.products,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteproduct =  async (req, res) => {
    try {
        const userid = req.params._id;
        const productid = req.params.productid;
        const updatedwholesaler = await Wholesalermodel.findOneAndUpdate(
            { _id: userid },
            {
                $pull: {
                    products: { id: productid }
                }
            },
            { new: true }
        );
        if (!updatedwholesaler) {
            res.status(404).json(
                { message: "Wholesaler or Product not found" }
            )
        }
        res.status(201).json(updatedwholesaler);
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
};

export const getsinglewholesaler = async (req, res) => {
    try {
        const id = req.params.id;
        const loginwholesaler = await Wholesalermodel.findById({ _id: id });
        if (loginwholesaler) {
            res.status(201).json({
                message: "Wholesaler Found",
                data: loginwholesaler
            })
        }
        else {
            res.status(500).json({
                message: "Wholesaler Not Found",
                data: loginwholesaler
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Wholesaler Not Found", error
        })
    }
};

export const updatewholesaler = async (req, res) => {
    try {
        const id = req.params.id;
        const { username, email, password,
            usertype, products } = req.body;
        const updatedwholesalers = await Wholesalermodel.findOneAndUpdate(
            { _id: id },
            {
                username: username,
                email: email,
                password: password,
                usertype: usertype,
                products: products,
            }
        )
        res.status(201).json({
            message: "Wholesaler Updated",
            data: updatedwholesalers
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
};