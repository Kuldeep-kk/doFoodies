import {Cart} from "../../../models/cart";
import {NextResponse} from "next/server";
import {connectDb} from "../../../helper/db";

connectDb();


export const POST=async (request) =>{
    const {title, userId, quantity, food, price, secure_url}=await request.json();

    try{
        const cartItem=new Cart({
            title,
            userId,
            quantity,
            food,
            price,
            secure_url,
        });
        const createCartItem=await cartItem.save();
        return NextResponse.json(createCartItem,{
            status:201,
        })
    }
    catch (e) {
        console.log(e);
        return NextResponse.json("Error in adding data",{
            status:404});

    }
}
