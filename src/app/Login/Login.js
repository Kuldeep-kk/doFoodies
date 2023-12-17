"use client";
import React, {useContext, useState} from 'react';
import Layout from '../Components/layout/layout';
import styles from './login.module.css';
import Head from "next/head";
import Link from "next/link";
import {FcGoogle} from 'react-icons/fc'
import {AiFillGithub} from 'react-icons/ai'
import {HiAtSymbol} from "react-icons/hi";
import {HiFingerPrint} from "react-icons/hi";
import { useSession, signIn, signOut } from "next-auth/react";
import {data} from "autoprefixer";
import Image from "next/image";
import lf from "../../../public/ImgSrc/leafAnim.png";
import {RxCross2} from "react-icons/rx";
import {login} from "@/services/userService";
import Swal from "sweetalert2";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

import UserContext from "../../context/userContext";
import {SessionProvider} from "next-auth/react";



const Login = () => {

    const router=useRouter();

    const {status,data}=useSession();

    console.log(status);

    const context = useContext(UserContext);


    const [show,setShow]=useState(false);


    const [loginData,setLoginData]=useState({
        email:"",
        password:""
    });
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const result=await login(loginData);
            console.log(result);
            console.log("login Successfull");

            setLoginData({
                email:"",
                password:"",
            });

            toast.success("Login Successful!!!",{
                position:"bottom-right"
            })
            context.setUser(result.user);
            router.push("/Home");


        }
        catch (e) {
            console.log(e);

        }




    }

    const handleSigninData=()=>{

        console.log(data)

    }



    return (

        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <section className={`${styles.LoginMainSec}`}>
                <div className={`${styles.LoginMainDiv}`}>

                    <h1 className={`${styles.LoginMainTag}`}>
                        Explore
                    </h1>
                    <p className={`${styles.LoginMainQuotes}`}>Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document . </p>
                </div>
                <form className={`flex flex-col gap-3 mt-4`} onClick={handleSubmit}>
                    <div className={`${styles.inputgroup}`}>
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            className={` py-2 px-6 focus:outline-none bg-slate-50 ${styles.inputText}`}
                            value={loginData.email}
                            autoComplete='email'
                            onChange={(event)=>{
                                setLoginData({
                                    ...loginData,
                                    email: event.target. value,
                                })
                            }}
                        />
                        <span className={`icon flex items-center ${styles.inputsymbol}`}>
                            <HiAtSymbol size={25}/>
                        </span>
                    </div>
                    <div className={`${styles.inputgroup}`}>
                        <input
                            type={`${show?"text":"password"}`}
                            name='password'
                            placeholder='Password'
                            autoComplete='current-password'
                            className={` py-2 px-6 focus:outline-none  bg-slate-50 ${styles.inputText}`}

                            value={loginData.password}
                            onChange={(event)=>{
                                setLoginData({
                                    ...loginData,
                                    password: event.target. value,
                                })
                            }}
                        />
                        <span className={`icon flex items-center ${styles.inputsymbol}`} onClick={()=>setShow(!show)}>
                            <HiFingerPrint size={25}/>
                        </span>
                    </div>
                    <div className={`input-button`}>
                        <button type='submit' className={`${styles.inputButton} active:scale-90`}>Login</button>
                    </div>
                    <div className={`input-button mt-2`}>
                        <button onClick={()=>{signIn('google'); handleSigninData()}} className={`${styles.inputGButton}`}>Sign In with Google<FcGoogle size={25} className={`ml-2`}/></button>
                    </div>
                    <div className={`input-button`}>
                        <button onClick={()=>{signIn('github')}} className={`${styles.inputGHButton}`}>Sign In with GitHub<AiFillGithub size={25} className={`ml-2 text-gray-800`}/></button>
                    </div>
                </form>
                <p className={`text-center text-gray-800 font-weight: 900 mt-4 ${styles.signupBut}`}>
                    dont have an account yet?<Link href="/Signup" className={`text-sky-300 pl-1 fw-medium cursor-pointer`} >Sign Up</Link>
                </p>
            </section>



        </Layout>
    );
};

export default Login;