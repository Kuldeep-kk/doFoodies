import {connectDb} from "../../../helper/db";
import {User} from "../../../models/user";
import {NextResponse} from "next/server";
import bcrypt from  "bcryptjs";
import {uploadPhoto} from "../../api/cloudImage/route";


connectDb();

export const GET=async (request)=>{
    let users=[];
    try{
        users=await User.find();
        console.log(users);
        return NextResponse.json(users);
    }
    catch (e) {
        return NextResponse.json({
            message:"Failed to get users",
            success:"false"
        })

    }
}

export const POST=async (request)=>{
    const {name,email,password,mobile,imgDataURL}=await request.json();

    const ImageData=await uploadPhoto(imgDataURL);
    console.log(ImageData);
    const user=await new User({
        name,
        email,
        password,
        mobile,
        public_id:ImageData.public_id,
        secure_url:ImageData.secure_url

    });
    try {
        user.password=bcrypt.hashSync
        (user.password,parseInt(process.env.BCRYPT_SALT));
        console.log(user);

        const createdUser=await user.save();
        const response=NextResponse.json(user,{
            status:201
        });
        return response;



    }
    catch (e) {
        console.log(e);
        return NextResponse.json({

            message:"failed to create user!!",
            status:false,
        })
        
    }
}