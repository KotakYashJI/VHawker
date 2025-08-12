import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
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
    UserRole:{
        type : String,
        enum:["Hawker","Semi_Wholesaler","Wholesaler"],
        required:true
    }
}, { timestamps: true }
)

const Usermodel = mongoose.model("User", Userschema);

export default Usermodel;