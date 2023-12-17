import {connectDb} from "../../../helper/db";
import {User} from "../../../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {NextResponse} from "next/server";
import {MyMailer} from "@/mailer/MyMailer";


export const POST=async (request)=>{

    const {email,password}=await request.json();
    try{
        await connectDb();
        const user=await User.findOne({
            email:email,
        });
        if(user==null){
            throw new Error("not found user");
        }

        const matched=bcrypt.compareSync(password,user.password);

        if(!matched){
            throw new Error("Password not matched");
        }

        const token=jwt.sign({
            _id:user.id,
            name:user.name
        },process.env.JWT_KEY);

        const response=NextResponse.json({
            message:"Login success !!!",
            success:true,
            user:user,
        })

        response.cookies.set("loginTokenRMS",token,{
            expiresIn:"1d",
            httpsOnly:true
        });
        console.log("---------calling mailer");

         await MyMailer();
        console.log("---------ending mailer");

        console.log(token);
        console.log(user);

        return response;

    }
    catch (e) {
        return NextResponse.json({
            message:e.message,
            success:false,
        },{
            status:500
        })

    }

}