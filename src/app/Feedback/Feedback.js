"use client";
import React, {useContext, useState} from 'react';
import Image from "next/image";
import formAnim from "../../../public/ImgSrc/formAnim.png"
import styles from "./feedback.module.css";
import {AiOutlinePicRight} from "react-icons/ai";
import {LuPenLine} from "react-icons/lu";
import {BiMessageSquareEdit} from "react-icons/bi";
import {AnimatePresence, motion} from "framer-motion";
import ViewProfile from "@/app/Components/ViewProfile/ViewProfile";
import WishCards from "@/app/Components/WishCards/WishCards";
import UserContext from "@/context/userContext";
import FormBox from "@/app/Components/FormBox/FormBox";
import ContactForm from "@/app/Components/Form/ContactForm";
const Feedback = () => {

    const context=useContext(UserContext);
    const [openForm,setForm]=useState(false);
    const [selectedFormType,setSelectedFormType]=useState("");

    const handleChildData = (childData) => {
        setForm(childData);
    };

    return (
        <div className={`flex flex-col pt-16 mb-12 md:mb-0 md:flex-row   ${styles.mainFeedback}`}>
            <div className={`w-full md:w-2/5 `}>
                <div className={`ml-10 mt-24 md:ml-10 lg:ml-32`}>
                <h2 className={`${styles.mainHead}  text-4xl font-bold uppercase md:text-4xl lg:text-6xl `}>Contact Us</h2>
                <p className={`mt-8 w-[90%] tracking-wide md:w-full text-slate-500 ${styles.quotes}`}>Get in touch with us. We value your feedback and are here to assist you. Contact our dedicated team for any questions or concerns, and let's make your experience better.</p>

                    <div className={`flex flex-row mt-12 ml-2 md:ml-2 lg:ml-12`}>
                        <div className={`flex items-center ${styles.contactUsButton}`} onClick={()=>{setForm(!openForm); setSelectedFormType("feedback")}}> <BiMessageSquareEdit size={25}/>Feedback</div>
                        <div className={`flex items-center ml-3 text-lg text-slate-500 cursor-pointer hover:scale-105 hover:text-slate-600`} onClick={()=>{setForm(!openForm); setSelectedFormType("enquiry")}}><LuPenLine size={25} className={`mr-2`}/>Having enquiry</div>
                    </div>
                </div>
            </div>
            <div className={`w-full  md:w-3/5`}>
                <Image src={formAnim} alt={"Anim"} className={`w-[85%] mt-10 m-auto md:mt-20 lg:mt-0`}/>

            </div>

            <AnimatePresence>
                {context.viewProfileCard && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                        <div
                            className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-75 backdrop-blur-sm"
                            onClick={()=>{context.setViewProfileCard(false)}}

                        />
                        <motion.div
                            initial={{ y: 50, opacity: 0,scale:0 }}
                            animate={{ y: 0, opacity: 1,scale:1 }}
                            exit={{ y: 50, opacity: 0,scale:0 }}
                            className="fixed transform">
                            <ViewProfile />

                        </motion.div>
                    </motion.div>
                )}
                {context.viewWishCard && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                        <div
                            className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-75 backdrop-blur-sm"
                            onClick={()=>{context.setViewWishCard(false)}}

                        />
                        <motion.div
                            initial={{ y: 50, opacity: 0,scale:0 }}
                            animate={{ y: 0, opacity: 1,scale:1 }}
                            exit={{ y: 50, opacity: 0,scale:0 }}
                            className="fixed transform">
                            <WishCards/>

                        </motion.div>
                    </motion.div>
                )}
                {openForm && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                        <div
                            className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-75 backdrop-blur-sm"
                            onClick={()=>{setForm(!openForm)}}

                        />
                        <motion.div
                            initial={{ y: 50, opacity: 0,scale:0 }}
                            animate={{ y: 0, opacity: 1,scale:1 }}
                            exit={{ y: 50, opacity: 0,scale:0 }}
                            className="fixed transform">
                            <FormBox formtype={selectedFormType} sendDataToParent={handleChildData}/>

                        </motion.div>
                    </motion.div>
                )}

            </AnimatePresence>

            
        </div>
    );
};

export default Feedback;