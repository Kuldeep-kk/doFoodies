import {httpAxios} from "../helper/httpHelper";

export async function addCart(item){

    const result= await httpAxios
        .post("/api/cart",item)
        .then((response)=>response.data);
    return result;
}
export async function showCart(userId){

    const result= await httpAxios
        .get(`/api/users/${userId}/cart`)
        .then((response)=>response.data);
    return result;
}
export async function deleteCart(itemId){
    const result=await httpAxios
        .delete(`/api/cart/${itemId}`)
        .then((response)=>response.data);
    return result;
}
export async function deleteALlCartItem(userId){
    const result=await httpAxios
        .delete(`/api/users/${userId}/cart`)
        .then((response)=>response.data);
    return result;
}

export async function incrementCartItem(userId,itemId){
    const result=await httpAxios
        .put(`/api/cartquantity/${userId}/increment/${itemId}`)
        .then((response)=>response.data);
    return result;
}

export async function decrementCartItem(userId,itemId){
    const result=await httpAxios
        .put(`/api/cartquantity/${userId}/decrement/${itemId}`)
        .then((response)=>response.data);
    return result;
}




