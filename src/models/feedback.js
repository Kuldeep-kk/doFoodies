import mongoose, {Schema} from "mongoose";


const FeedbackSchema=new Schema({
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
    rating:{
        type:Number
    },
    userId:{
        type:mongoose.ObjectId,
        required:true,
    },
});
export const Feedback=
    mongoose.models.feedback || mongoose.model("feedback",FeedbackSchema);
