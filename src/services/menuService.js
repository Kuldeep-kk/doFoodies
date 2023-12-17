import {httpAxios} from "../helper/httpHelper";

export async function showFoodMenu(){

    const result= await httpAxios
        .get(`/api/menu`)
        .then((response)=>response.data);
    return result;
}