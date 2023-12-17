import mongoose, {Schema} from "mongoose";

const LandingSchema=new Schema({
    title:{
        type:String
    },
    postersrc:String,
});
export const Landing=
    mongoose.models.posterlandingpage || mongoose.model("posterlandingpage",LandingSchema);
