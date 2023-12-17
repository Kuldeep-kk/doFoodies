import {httpAxios} from "../helper/httpHelper";

export async function addFeed(data){

    const result= await httpAxios
        .post("/api/feedback",data)
        .then((response)=>response.data);
    return result;
}

export async function addEnq(data){

    const result= await httpAxios
        .post("/api/enquiry",data)
        .then((response)=>response.data);
    return result;
}