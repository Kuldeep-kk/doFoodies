import {Cart} from "../../../../../models/cart";
import {NextResponse} from "next/server";
import {getResponseMessage} from "../../../../../helper/getResponseMessage";



export const GET=async (request,{params})=>{
    const { usersId }=params;
    try{
        console.log("Its a cart data api")
        const cartItem=await Cart.find({
            userId:usersId
        });
        console.log(cartItem);
        return NextResponse.json(cartItem);
    }
    catch (e) {
        console.log(e);
    }
}


export const DELETE=async (request,{params})=>{
    const { usersId }=params;
    try{
        console.log(usersId);
        await Cart.deleteMany({
            userId:usersId,
        });
        return getResponseMessage("Deleted",200,true);
    }
    catch(e){
        console.log(e);
        return getResponseMessage("failed to delete task",404,false);
    }
}