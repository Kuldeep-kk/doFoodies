import {httpAxios} from "../helper/httpHelper";

export async function addItemWishList(item){

    const result= await httpAxios
        .post("/api/wishlist",item)
        .then((response)=>response.data);
    return result;
}
export async function showWish(userId){

    const result= await httpAxios
        .get(`/api/users/${userId}/wishlist`)
        .then((response)=>response.data);
    return result;
}