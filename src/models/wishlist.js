import mongoose, {Schema} from "mongoose";

const WishSchema=new Schema({
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
    desc:{
        type:String,
        required: true,
    },
    quantity:{
        type:Number
    },
    addedDate:{
        type:Date,
        required:true,
        default:Date.now(),
    },
    userId:{
        type:mongoose.ObjectId,
        required:true,
    },
    secure_url:String,
});
export const Wish=
    mongoose.models.wishlists || mongoose.model("wishlists",WishSchema);
