"use client";
import React, {useState} from 'react';
import Layout from '../Components/layout/layout';
import styles from './signup.module.css';
import Head from "next/head";
import Link from "next/link";
import {HiAtSymbol} from "react-icons/hi";
import {HiFingerPrint} from "react-icons/hi";
import {BsPerson} from "react-icons/bs";
import {signup} from "@/services/userService";
import {useRouter} from "next/navigation";
import {toast, ToastContainer} from "react-toastify";
import Cropper from "../Components/Avatar/Avatar";
import {CiMobile3} from "react-icons/ci";
import * as Yup from "yup";
import {Formik} from "formik";


const Signup = () => {

    const signupSchema = Yup.object().shape({
        name: Yup.string()
            .min(4, 'Name must be at least 4 characters')
            .required('Name is required'),

        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),

        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            )
            .required('Password is required'),

        mobile: Yup.number()
            .typeError('Phone number must be a number')
            .integer('Phone number must be an integer')
            .positive('Phone number must be positive')
            .test('is-valid-phone', 'Invalid phone number', (value) => {
                return value.toString().length === 10;
            })
            .required('Phone number is required'),
    });


    const router=useRouter();

    const registerUser = async (name,mobile,email,password) => {
        const data={
            name:name,
            mobile:mobile,
            email:email,
            password:password,
        }
        try{
            const storageKey = 'tempImageData';
            const imgDataURL = localStorage.getItem(storageKey);

            if(imgDataURL){
                const result=await signup(data,imgDataURL);
                console.log("user signup fn called");
                console.log(result);

                localStorage.removeItem(storageKey);

                toast.success('Signup successful!!');
                router.push('/Login');

            }
            else{
                toast.error("Please Select profile pic!!!",{
                    position:"bottom-right"
                });
            }
        }
        catch (e) {
            console.log(e);

        }
    }


    const [show,setShow]=useState(false);
    const [cshow,setCShow]=useState(false);
    return (
        <Layout>
            <Head>
                <title>Register</title>
            </Head>
            <section className={`${styles.SignUpMainSec} relative`}>

                <div className={`${styles.SignUpMainDiv}`}>
                    <h1 className={`${styles.SignUpMainTag}`}>
                        Register
                    </h1>
                    <p className={`${styles.SignUpMainQuotes}`}>Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document . </p>
                </div>

                <Formik
                    initialValues={{
                        name:'',
                        email:'',
                        password:'',
                        mobile: ''

                    }}
                    validationSchema={signupSchema}
                    onSubmit={values => {
                        registerUser(values.name,values.mobile,values.email,values.password);

                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          isValid,
                          handleChange,
                          handleSubmit,
                          handleReset,

                      }) => (
                <div className={`flex flex-col gap-4 `}  >
                    <Cropper/>
                    <div className={`relative`}>
                    <div className={`${styles.inputgroup}`}>

                        <input
                            type='text'
                            name='name'
                            placeholder='Username'
                            required
                            value={values.name}
                            onChange={handleChange}
                            className={` py-1 px-6 focus:outline-none bg-slate-50 ${styles.inputText}`}
                        />
                        <span className={`icon flex items-center ${styles.inputsymbol}`}>
                            <BsPerson size={25}/>
                        </span>
                    </div>
                    {touched.name && errors.name && (
                        <p className={`absolute right-[5%] text-xs text-red-500`}>
                            *{errors.name}
                        </p>
                    )}
                </div>
                    <div className={`relative`}>
                    <div className={`${styles.inputgroup}`}>
                        <input
                            type='number'
                            name='mobile'
                            placeholder='Mobile No.'
                            required
                            value={values.mobile}
                            onChange={handleChange}
                            className={` py-1 px-6 focus:outline-none bg-slate-50 ${styles.inputText}`}
                        />
                        <span className={`icon flex items-center ${styles.inputsymbol}`}>
                            <CiMobile3 size={25}/>
                        </span>
                    </div>
                    {touched.mobile && errors.mobile && (
                        <p className={`absolute right-[5%] text-xs text-red-500`}>
                            *{errors.mobile}
                        </p>
                    )}
                </div>
                    <div className={`relative`}>
                    <div className={`${styles.inputgroup}`}>
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            required
                            value={values.email}
                            onChange={handleChange}
                            className={` py-1 px-6 focus:outline-none bg-slate-50 ${styles.inputText}`}
                        />
                        <span className={`icon flex items-center ${styles.inputsymbol}`}>
                            <HiAtSymbol size={25}/>
                        </span>
                    </div>
                    {touched.email && errors.email && (
                        <p className={`absolute right-[5%] text-xs text-red-500`}>
                            *{errors.email}
                        </p>
                    )}
                </div>
                    <div className={`relative`}>
                    <div className={`${styles.inputgroup}`}>
                        <input
                            type={`${show?"text":"password"}`}
                            name='password'
                            placeholder='Password'
                            required
                            value={values.password}
                            onChange={handleChange}
                            className={` py-1 px-6 focus:outline-none  bg-slate-50 ${styles.inputText}`}
                        />
                        <span className={`icon flex items-center ${styles.inputsymbol}`} onClick={()=>setShow(!show)}>
                            <HiFingerPrint size={25}/>
                        </span>

                    </div>
                    {touched.password && errors.password && (
                        <p className={`absolute right-[5%] text-xs text-red-500`}>
                            *{errors.password}
                        </p>
                    )}
                    </div>

                    <div className={`input-button mt-2`}>
                        <button type='submit' onClick={handleSubmit} className={`${styles.inputButton} active:scale-90`}>Register</button>
                    </div>

                </div>
                    )}
                </Formik>
                <p className={`text-center text-gray-800 font-weight: 900 mt-2`}>
                    Have an account?<Link href="/Login" className={`text-sky-300 pl-1 fw-medium cursor-pointer`}>Sign In</Link>
                </p>



            </section>




        </Layout>
    );
};

export default Signup;