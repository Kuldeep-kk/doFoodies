import mongoose, { Schema, models } from "mongoose";

const userAuthSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        public_id:String,
        secure_url:String,
        mobile:{
            type: String,
            required: true,
            default:"Enter Your Number"
        }
    },
    { timestamps: true }
);

const UserAuth = models.UserAuth || mongoose.model("userAuth", userAuthSchema);
export default UserAuth;