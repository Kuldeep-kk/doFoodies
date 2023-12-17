import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "../../../models/user";
import { connectDb } from "../../../helper/db";
import { parse } from "cookie";
import { decode } from 'next-auth/jwt';
export const GET = async (request) => {

    await connectDb();

    const cookies = parse(request.headers.cookie || "");

    const loginToken=request.cookies.get("loginTokenRMS")?.value;


    console.log("------------------------------------------login token");
    console.log(loginToken);


    console.log("--------decode start");
    const sessionToken=request.cookies.get("__Secure-next-auth.session-token")?.value;
    console.log(sessionToken);
    const decoded=await decode({
        token:sessionToken,
        secret:process.env.NEXTAUTH_SECRET
    });
    console.log(decoded);
    console.log("----------------------decode end");

    try {

        if(decoded){

            const user = await User.findOne({ email:decoded.email });

            if (!user) {
                throw new Error("User not found.");
            }

            return NextResponse.json(user);

        }
        else if(loginToken){

            const data = jwt.verify(loginToken, process.env.JWT_KEY);
            console.log("------------------------------------------login current data");
            console.log(data);

            const user = await User.findById(data._id).select("-password");

            if (!user) {
                throw new Error("User not found.");
            }

            return NextResponse.json(user);

        }
        else{
            throw new Error("Login token not found.");
        }

    } catch (error) {
        console.error("Error in GET /api/current/route:", error);
        return NextResponse.error("Internal Server Error", 500);
    }
};
