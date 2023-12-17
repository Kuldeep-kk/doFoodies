import {NextResponse} from "next/server";

export async function POST(request){

    const response=NextResponse.json({
        message:"Logged out!!!",
        success:true
    });
    response.cookies.set("loginTokenRMS","",{
        expires: new Date(0),
    });

    return response;

}