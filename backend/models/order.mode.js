import mongoose from "mongoose"

const orderschema = mongoose.Schema({
    orderdate:{
        type:String,
        required:true
    },
    buyerid:{
        type:String,
        required:true
    },
    buyertype:{
        type:String,
        required:true
    },
    sellerid:{
        type:String,
        required:true
    },
    sellertype:{
        type:String,
        required:true
    },
    paymentdata:[],
    orderdata:[],
})

const Ordermodel = mongoose.model("orderdata",orderschema);

export default Ordermodel;