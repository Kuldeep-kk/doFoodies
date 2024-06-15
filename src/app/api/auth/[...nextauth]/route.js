import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github"
import jwt from "jsonwebtoken";
import {serialize} from "cookie";
import {connectDb} from "@/helper/db";
import {User} from "@/models/user";
import {MyMailer} from "@/mailer/MyMailer";

const authOptions={

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],

    callbacks:{
        async signIn({user,account}){
            if(account.provider === 'google' || account.provider ==='github') {

                const {name, email, image} = user;
                try {

                    connectDb();


                    const userExists = await User.findOne({email});

                    if(!userExists) {
                        await MyMailer(name,email,"Welcome to doFoodies:)");
                        const res = await fetch('https://dofoodies.vercel.app/api/userauth', {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name: name,
                                email: email,
                                public_id: "",
                                secure_url: image,
                            }),

                        });
                        if (res.ok) {
                            return res;
                        }
                    }
                    else{
                        await MyMailer(name,email,"Welcome Back to doFoodies:)");

                    }

            }
                catch (e){
                    console.log(e)

                }
            }
            console.log(user)

            return user;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            console.log("---- getting token");

            return token;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
