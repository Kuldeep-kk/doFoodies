import mongoose, {Schema} from "mongoose";

const CartSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    food:{
        type:String,
        required: true,
    },
    price:{
        type:Number,
        required:true
    },
    addedDate:{
        type:Date,
        required:true,
        default:Date.now(),
    },
    quantity:{
        type:Number
    },
    userId:{
        type:mongoose.ObjectId,
        required:true,
    },
    secure_url:String,
});
export const Cart=
    mongoose.models.carts || mongoose.model("carts",CartSchema);
