"use client";
import React, {useContext, useEffect, useState} from 'react';
import styles from "./home.module.css"
import UserContext from "../../context/userContext";
import Link from "next/link";
import {AnimatePresence, motion} from "framer-motion";
import PageWrapper from "../PageWrapper";
import PopularProduct from "@/app/Components/PopularProducts/PopularProduct";
import FastFoodDeliveryService from "@/app/Components/FastFoodDeliveryService/FastFoodDeliveryService";
import PopularFood from "@/app/Components/PopularFood/PopularFood";
import DownloadApp from "@/app/Components/DownloadApp/DownloadApp";
import Testimonial from "@/app/Components/Testimonial/Testimonial";
import SpecialDiscount from "@/app/Components/SpecialDiscount/SpecialDiscount";
import Cart from "@/app/Components/Cart/Cart";
import ViewProfile from "@/app/Components/ViewProfile/ViewProfile";
import WishCards from "@/app/Components/WishCards/WishCards";
import Image from "next/image";
import pizza from "../../../public/ImgSrc/pizzafresh.webp";
import {signIn, useSession} from "next-auth/react";
import {FcGoogle} from "react-icons/fc";


const Home = () => {



    const context=useContext(UserContext);
    const [currentImage, setCurrentImage] = useState(0);
    const variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const images = {
        hidden: {
            opacity: 0,
            x: 30,
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 1
            },
        },
    };


    useEffect( () => {

        const initialDelay = setTimeout(() => {
            const interval = setInterval(() => {
                setCurrentImage((prevImage) => (prevImage + 1) % context.poster.length);
            }, 5000);

            return () => clearInterval(interval);
        }, 2000); // Adjust the initial delay time as needed

        return () => clearTimeout(initialDelay);
    }, []);


    return (
        <div className={` ${styles.homemain} overflow-hidden`} >
            <div className={` fixed w-80 top-32 ${styles.cartStyle} backdrop-blur ${context.isCartOpen ?`right-0`:`-right-96`}`}>
                <Cart/>
            </div>
            <PageWrapper>

                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate="show"
                    className={`flex flex-col md:flex-row`}>
                    <div className={`${styles.mainHead} `}>
                        <h5 className={`${styles.preHead}`}>NOW TAKING ONLINE ORDER</h5>
                        <h1 className={`${styles.headW} relative h-36 `}>

                            {context.poster.map((image, index) => (

                                <div
                                    key={index}
                                    className={`${styles.slide} absolute w-full h-full transition-transform transform ${
                                        index === currentImage ? 'translate-x-0 transition-duration-1000' : '-translate-x-full transition-duration-1000'
                                    }`}
                                >
                                    <h1 className={`${styles.posterTitle}`}>{image.title}</h1>

                                </div>
                            ))}
                        </h1>
                        <p className={`${styles.headP}`}>
                            Restaurant style Yogurt Mint Sauce is
                            delicious dip which is quick and easy to ... This ia a standard
                            India mint chutney served with poppadums along with mint and lemon.
                        </p>
                        <div className={`${styles.homebutton} `}>
                            <Link href="/Menu">
                        <span className={`${styles.homebuttonmenu} `}  >
                           Go To Menu
                        </span>
                            </Link>
                            <span className={`${styles.homebuttoncart} `}  onClick={(e)=>{
                                context.setCartOpen(true);
                            }}>
                            Go To Cart
                        </span>
                        </div>

                        <div className={`${styles.homeCompTime} -mt-16`}>
                            <div className={`justify-between ${styles.homeTimeHead} `}>
                        <span  className={`${styles.homeMorningTime} `} >
                            Lunch

                        </span>
                                <span className={`${styles.homeEveningTime} `} >
                            Dinner

                        </span>
                            </div>
                            <div className={`justify-between ${styles.homeTimeHeadInterval} `}>
                        <span className={`${styles.homeMorningTimeInterval} `} >
                            1:00 - 3:00 pm

                        </span>
                                <span className={`${styles.homeEveningTimeInterval} `} >
                            7:00 - 10:00 pm

                        </span>
                            </div>
                        </div>

                    </div>

                    <div className={` w-full md:w-1/2 relative ${styles.propic}`}>
                        {context.poster.map((image, index) => (

                            <div
                                key={index}
                                className={`${styles.slide} absolute w-full h-full transition-transform transform ${
                                    index === currentImage ? 'translate-x-0 transition-duration-1000' : 'translate-x-full transition-duration-1000'
                                }`}
                            ><img
                                src={image.postersrc}
                                alt={image.title}
                                className={`${styles.menuLogo}`}

                            />
                            </div>
                        ))}
                    </div>
                </motion.div>
                <PopularProduct/>

                <FastFoodDeliveryService/>
                <PopularFood/>
                <DownloadApp/>
                <Testimonial/>
                <SpecialDiscount/>
               </PageWrapper>

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
            </AnimatePresence>

        </div>

    );
};

export default Home;