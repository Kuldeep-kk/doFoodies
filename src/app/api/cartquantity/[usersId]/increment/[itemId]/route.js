import {Cart} from "../../../../../../models/cart";
import {getResponseMessage} from "../../../../../../helper/getResponseMessage";


export const PUT=async (request,{params})=>{
    const { usersId, itemId}=params;

    try {
        console.log(usersId);
        console.log(itemId);
        const updateCart=await Cart.updateOne(
            {
                userId: usersId,
                _id: itemId,
            },
            {
                $inc: { quantity : 1},
            }
        );
        return getResponseMessage("Quantity Increment",200,true);

    }
    catch (e) {
        console.log(e);
        return getResponseMessage("Failed to Increment Quantity",500,false);


    }
}