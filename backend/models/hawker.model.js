import mongoose from "mongoose";

const Hawkerschema = new mongoose.Schema({
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
    cart:[],
    usertype:{
        type:String,
        default:"Hawker"
    },
    city:{
        type:String,
        required:true
    }
}, { timestamps: true }
)

const Hawkermodel = mongoose.model("Hawker", Hawkerschema);

export default Hawkermodel;