import mongoose from "mongoose";

const Productschema = mongoose.Schema({
    productimg: {
        type: String,
        required: true
    },
    productname: {
        type: String,
        required: true
    },
    productprice: {
        type: Number,
        required: true
    },
    productquantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},
{timestamps:true})

const Productmodel = mongoose.model("product",Productschema);

export default Productmodel;