"use client";
import React, {useContext} from 'react';
import styles from "./about.module.css";
import Image from "next/image";
import AboutPic from "public/ImgSrc/AboutMain.png";
import img1 from "../../../public/ImgSrc/splAboutMain.png";
import ascooter from "../../../public/ImgSrc/aboutScooter.gif";
import bfrench from "../../../public/ImgSrc/aboutBurgerFrench.gif";
import specialCombo from "../../../public/ImgSrc/AboutSCombo.png";
import aboutRPic from "../../../public/ImgSrc/AboutRotatePic.png";
import chopperPic from "../../../public/ImgSrc/chopperFood.png";
import Footer from "../Components/Footer/Footer";
import Cart from "../Components/Cart/Cart";
import UserContext from "../../context/userContext";
import PageWrapper from "../PageWrapper";
const About = () => {
    const context=useContext(UserContext);

    return (
        <div className={`overflow-hidden relative`}>
            <div className={` fixed w-80 top-36 ${styles.cartStyle} backdrop-blur ${context.isCartOpen ?`right-0`:`-right-96`}`}>

                <Cart/>
            </div>
            <PageWrapper>


                <div className={` ${styles.AboutMain}`} >

                    <div className={`flex flex-col md:flex-row ms-4 me-4`}>
                        <div className={`w-full md:w-1/2 ${styles.aboutHero} `}>
                            <h1 className={`${styles.aboutEat}`}>Eat today</h1>
                            <h1 className={`${styles.aboutEatPost}`}>
                                Live another day

                            </h1>

                            <p className={`${styles.aboutEatQuotes}`}>

                                Savor today delights, flourish tomorrow! Relish flavors, nourish joy, and embrace vibrant vitality on your journey.
                            </p>

                            <div className={` ${styles.homebutton} `}>
                                <span className={`${styles.homebuttonmenu} `} >
                                    Contact Us
                                </span>
                                <span className={`${styles.homebuttoncart} `} >
                                    Join Us
                                </span>
                            </div>


                        </div>



                        <div className={`w-full md:w-1/2 text-center z-5 ${styles.aboutPics} `}>

                            <Image src={AboutPic} alt="food" className={` ${styles.aboutPic}`} />
                            <div className={`w-full md:w-1/2 ${styles.aboutfeed}`}>
                                <div className="flex flex-col md:flex-row ms-4 me-4">
                                    <div className={`w-full md:w-1/3 mt-4 pr-5  ${styles.Aboutimg1Box} `}>
                                        <Image src={img1} alt="food" className={`${styles.Aboutimg1} h-20 `}  priority/>
                                    </div>
                                    <div className={`w-full md:w-2/3  mt-1   text-left`}>
                                        <h2 className={`${styles.feedBoxHead}`}>
                                            Noodle Pasta
                                        </h2>
                                        <h3 className={`${styles.feedBoxRating}`}>⭐ 4.8</h3>

                                        <p className={`${styles.aboutFeedText}`}>
                                            Savor the culinary delights of today,
                                            and ye shall flourish in the morrow!
                                            Relish lifes delectable flavors.
                                        </p>
                                    </div>

                                </div>



                            </div>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col md:flex-row ms-4 me-4 z-50 ${styles.aboutFeatureMain}`}>
                    <div className={`w-full md:w-1/3 `}>
                        <div className={`flex flex-col md:flex-row ms-4 me-4 ${styles.aboutFeature}`}>
                            <div className={`w-full md:w-1/3 h-12  mt-1  `}>
                                <Image src={ascooter} alt="food" className={`${styles.aboutScooter}`}  priority/>
                            </div>
                            <div className={`w-full md:w-2/3 mt-4 text-left `}>
                                <h2 className={`${styles.feedBoxAbout}`}>
                                    Fastest Delivery
                                </h2>

                            </div>



                            <p className={`${styles.aboutFeedTextFeature} mt-4 mb-2`}>
                                Rapid currents of service weave destiny tapestry, delivering aspirations to doorsteps.
                            </p>

                        </div>

                    </div>
                    <div className={`w-full md:w-1/3 `}>
                        <div className={`flex flex-col md:flex-row ms-4 me-4 ${styles.aboutFeature}`}>
                            <div className={`w-full md:w-1/3 h-12 mt-1`}>
                                <Image src={bfrench} alt="food" className={`${styles.bFrench}`}  priority/>
                            </div>
                            <div className={`w-full md:w-2/3 mt-4 text-left `}>
                                <h2 className={`${styles.feedBoxAbout}`}>
                                    So Much to Choose From
                                </h2>

                            </div>
                            <p className={`${styles.aboutFeedTextFeature} mt-3.5 mb-2`}>
                                So many paths, endless choices; each step shapes a unique journey of life abundance.
                            </p>

                        </div>
                    </div>
                    <div className={`w-full md:w-1/3  `}>
                        <div className={`flex flex-col md:flex-row ms-4 me-4 ${styles.aboutFeature}`}>
                            <div className={`w-full md:w-1/3 h-12  mt-1  `}>
                                <Image src={specialCombo} alt="food" className={`${styles.bFrench}`}  priority/>
                            </div>
                            <div className={`w-full md:w-2/3 mt-4  text-left`}>
                                <h2 className={`${styles.feedBoxAbout}`}>
                                    Best Offers In Town!
                                </h2>

                            </div>



                            <p className={`${styles.aboutFeedTextFeature} mt-4 mb-2`}>
                                Finest treasures await; seize the ultimate deals, where value and joy converge.
                            </p>

                        </div>
                    </div>
                </div>
                <div className={`flex flex-col md:flex-row ms-4 me-4 ${styles.rotationArea} `}>

                    <div className={`w-full md:w-1/2 text-center -z-20 ${styles.aboutRPicMain} `}>

                        <Image src={aboutRPic} alt="food" className={` ${styles.aboutRPic}`} />

                    </div>
                    <div className={`w-full md:w-1/2 ps-5  pt-5 mt-5 `}>
                        <Image src={chopperPic} alt="food" className={` ${styles.chooperFood}`}/>

                        <h1 className={`${styles.aboutResSemiTag}`}><span>O</span>ur popular <span className={` ${styles.chooperFoodRes}`}>restaurants</span></h1>
                        <h1 className={`${styles.aboutEat}`}>1000+</h1>
                        <h1 className={`${styles.aboutResSemiTag2}`}>
                            Our delicious food

                        </h1>

                        <p className={`${styles.aboutEatQuotes}`}>
                            Popular restaurants: culinary temples, artful flavors; connecting, inspiring, celebrating life; shared moments, cherished memories; cultural icons shaping gastronomy legacy.
                        </p>

                        <div className={` ${styles.homebutton} `}>
                            <span className={`${styles.explorebuttonmenu} `} >
                                EXPLORE MENU
                            </span>
                        </div>


                    </div>
                </div>
            </PageWrapper>

        </div>
    );
};

export default About;