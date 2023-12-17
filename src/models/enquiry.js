import mongoose, {Schema} from "mongoose";


const EnquirySchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required: true,
    },
    mobile:{
        type:Number,
        required:true
    },
    addedDate:{
        type:Date,
        required:true,
        default:Date.now(),
    },
    msg:{
        type:String,
        required: true,
    },
    userId:{
        type:mongoose.ObjectId,
        required:true,
    },
});
export const Enquiry=
    mongoose.models.enquiry || mongoose.model("enquiry",EnquirySchema);
