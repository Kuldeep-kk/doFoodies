import {httpAxios} from "../helper/httpHelper";

export const signup=async (user,imgDataURL)=>{

    const result=await httpAxios
        .post('/api/users',{...user,imgDataURL})
        .then((response)=>response.data);
    return result;

}
export const login =async (loginData)=>{

    const result= await httpAxios
        .post("/api/login",loginData)
        .then((response)=>response.data);
    return result;

}

export const currentUser = async () => {
    const result = await httpAxios
        .get("api/current")
        .then((response)=>response.data);
    return result;
}

export async function logout(){

    const result= await httpAxios
        .post("/api/logout")
        .then((response)=>response.data);
    return result;
}

export const  landingData= async () => {
    const result = await httpAxios
        .get("api/landing")
        .then((response)=>response.data);
    return result;
}

export const updateUserDetail=async (userId,data)=>{

    const result=await httpAxios
        .put(`/api/users/${userId}/updateuser`,{...data})
        .then((response)=>response.data);
    return result;

}


