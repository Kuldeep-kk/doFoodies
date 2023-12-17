
import {NextResponse} from "next/server";
import {connectDb} from "../../../helper/db";
import {Wish} from "../../../models/wishlist";

connectDb();


export const POST=async (request) =>{
    const {title, userId,food,quantity,desc, price, secure_url}=await request.json();

    try{
        const wishItem=new Wish({
            title,
            userId,
            quantity,
            food,
            price,
            desc,
            secure_url,
        });
        const createWishItem=await wishItem.save();
        return NextResponse.json(createWishItem,{
            status:201,
        })
    }
    catch (e) {
        console.log(e);
        return NextResponse.json("Error in adding data",{
            status:404});

    }
}
