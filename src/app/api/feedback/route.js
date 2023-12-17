import {NextResponse} from "next/server";
import {Feedback} from "@/models/feedback";
import {connectDb} from "../../../helper/db";

connectDb();
export const POST=async (request)=>{
    const {name,email,mobile,msg,rating,userId}=await request.json();

    try{
        const feedData=new Feedback({
            name,
            email,
            mobile,
            msg,
            rating,
            userId
        });
        const createFeedback=await feedData.save();
        return NextResponse.json(createFeedback,{
            status:201,
        })
    }
    catch (e) {
        console.log(e);
        return NextResponse.json("Error in adding data",{
            status:404});

    }
}