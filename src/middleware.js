import {NextResponse} from "next/server";

export function middleware(request){
    console.log("middleware executed");

    const loginToken=(request.cookies.get("loginTokenRMS") || request.cookies.get("__Secure-next-auth.session-token")) ?.value;

    if(request.nextUrl.pathname === "/api/login" || request.nextUrl.pathname === "/api/users" || request.nextUrl.pathname === "/api/userauth"){
        return
    }

    const loggedInUserNotAccessPaths = request.nextUrl.pathname ==="/Login"
    ||  request.nextUrl.pathname === '/Signup' ;

    if(loggedInUserNotAccessPaths){
        if(loginToken){

            return  NextResponse.redirect(new URL('/Home',request.url));
        }
    }
    else{
        if(!loginToken){
            if(request.nextUrl.pathname.startsWith("/api")  && !request.nextUrl.pathname.startsWith("/api/auth")){
                return NextResponse.json({
                    message:"Access Denied!!!",
                    success:false
                },{
                    status:401
                })
            }
            else if(request.nextUrl.pathname.startsWith("/api/auth")){
                return
            }
            return NextResponse.redirect(new URL('/Login',request.url));
        }
        else if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/Home", request.url));
    }
    }


}

export const config={

    matcher:['/','/Login','/Signup','/api/:path*','/Home','/About',]

}
