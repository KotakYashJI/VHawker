import mongoose from "mongoose";

const SemiWholesalerschema = new mongoose.Schema({
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
        default: "Semiwholesaler"
    },
    city: {
        type: String,
        required: true
    }
}, { timestamps: true }
)

const Semiwholesalermodel = mongoose.model("Semiwholesaler", SemiWholesalerschema);

export default Semiwholesalermodel;