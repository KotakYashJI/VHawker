import mongoose from "mongoose";

const Wholesalerschema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    products: [],
    usertype: {
        type: String,
        default: "Wholesaler"
    },
    city: {
        type: String,
        required: true
    }
}, { timestamps: true }
)

const Wholesalermodel = mongoose.model("Wholesaler", Wholesalerschema);

export default Wholesalermodel;