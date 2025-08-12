export const createproducts = async (req, res) => {
    try {
        await Productmodel.create(req.body);
        res.status(201).json({ message: "Product Created Successfully!" })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getallproducts = async (req, res) => {
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
}

export const getsingleproduct = async (req, res) => {
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
}

export const updateproduct = async (req, res) => {
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
}

export const deleteproduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Productmodel.findOneAndDelete({ _id: id });
        res.status(201).json({message:"Product Deleted",data:product})
    } catch (error) {
        res.status(500).json({message:"Product not Deleted",error});
    }
}