import {Cart} from "../../../../models/cart";

import {getResponseMessage} from "../../../../helper/getResponseMessage";


export const DELETE=async (request,{params})=>{
    const {itemId}=params;
    try{
        await Cart.deleteOne({
            _id:itemId,
        });
        return getResponseMessage("Deleted",200,true);
    }
    catch(e){
        console.log(e);
        return getResponseMessage("failed to delete task",404,false);
    }
}