import {NextResponse} from "next/server";

import {connectDb} from "../../../helper/db";
import {Enquiry} from "@/models/enquiry";

connectDb();
export const POST=async (request)=>{
    const {name,email,mobile,msg,userId}=await request.json();

    try{
        const enqData=new Enquiry({
            name,
            email,
            mobile,
            msg,
            userId
        });
        const createEnq=await enqData.save();
        return NextResponse.json(createEnq,{
            status:201,
        })
    }
    catch (e) {
        console.log(e);
        return NextResponse.json("Error in adding data",{
            status:404});

    }
}