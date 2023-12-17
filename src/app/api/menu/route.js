import {Food} from "../../../models/menu";
import {NextResponse} from "next/server";
import {connectDb} from "../../../helper/db";


export const GET=async ()=>{
    try{
        await connectDb();
        const food=await Food.find();
        return NextResponse.json(food);
    }
    catch (e) {
        console.log(e);


    }
}