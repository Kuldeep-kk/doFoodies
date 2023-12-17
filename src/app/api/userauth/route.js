import {connectDb} from "../../../helper/db";
import {NextResponse} from "next/server";

import {User} from "@/models/user";
import jwt from "jsonwebtoken";
import {serialize} from "cookie";


connectDb();

export async function POST(request) {
    const { name, email,mobile , public_id,secure_url } = await request.json();
    const user=await new User({
        name,
        email,
        mobile,
        public_id,
        secure_url,
    });

    try{

        const createdUser=await user.save();

        const mtoken=jwt.sign({
            email:createdUser.email,
            name:createdUser.name
        },process.env.JWT_KEY);

        const response=NextResponse.json({
            message:"Login success !!!",
            success:true,
            user:user,
        })

        response.cookies.set("loginTokenRMS",mtoken,{
            expiresIn:"1d",
            httpsOnly:false
        });

        console.log(mtoken);
        console.log(user);
        console.log(response);

        return response;


    }
    catch (e) {
        console.log(e);
        return NextResponse.json({
            message:e.message,
            success:false,
        },{
            status:500
        })

    }


}