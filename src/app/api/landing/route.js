import {NextResponse} from "next/server";
import {Landing} from "../../../models/landing";
import {connectDb} from "../../../helper/db";

export const GET=async (request)=>{

    await connectDb();

    console.log("Its a Landing api");
    try{
        const landingData=await Landing.find();
        return NextResponse.json(landingData);
    }
    catch (e) {
        console.log(e);
        return NextResponse.json({
            message:"Failed to get landing data",
            success:"false"
        })


    }
}