
import {NextResponse} from "next/server";
import {Wish} from "../../../../../models/wishlist";


export const GET=async (request,{params})=>{
    const { usersId }=params;
    try{
        console.log("Its a wishlist data api")
        const wishItem=await Wish.find({
            userId:usersId
        });
        console.log(wishItem);
        return NextResponse.json(wishItem);
    }
    catch (e) {
        console.log(e);
    }
}