import mongoose from "mongoose";

const Contactschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message:{
        type:String,
        required:true
    },
}, { timestamps: true }
)

const Contactmodel = mongoose.model("Contact", Contactschema);

export default Contactmodel;