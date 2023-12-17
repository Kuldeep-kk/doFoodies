import mongoose, {Schema} from "mongoose";

const FoodSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required: true,
    },
    category:{
        type:String,
        required: true,
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
    public_id:String,
    secure_url:String,
});
export const Food=
    mongoose.models.foodmenu || mongoose.model("foodmenu",FoodSchema);
