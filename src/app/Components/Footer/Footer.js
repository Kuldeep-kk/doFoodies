import React from 'react';
import styles from "./footer.module.css";
import Link from "next/link";
import {BiLogoFacebook, BiLogoInstagram, BiLogoLinkedin, BiLogoLinkedinSquare, BiLogoTwitter} from "react-icons/bi";
import {PiInstagramLogoDuotone} from "react-icons/pi";
import {FaLinkedinIn} from "react-icons/fa";
import {HiFingerPrint, HiMail} from "react-icons/hi";
import {FaLocationDot} from "react-icons/fa6";
import {HiDevicePhoneMobile} from "react-icons/hi2";
import Image from "next/image";
import Logo from "../../../../public/ImgSrc/myLogo.png";

const Footer = () => {
    return (
        <div className={styles.fMain}>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/4 ps-5 mt-5 ">
                    <Link href='/'>
                        <Image src={Logo} alt={Logo} width="180" height="75" className="cursor-pointer p-3 -ml-1  lg:-mb-7" priority/>
                    </Link>
                    <ul class={`flex ${styles.socialTag}`}>
                        <a
                            href="https://www.facebook.com/profile.php?id=100011595158136"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <span className={`icon flex items-center ${styles.icface}`} >
                            <BiLogoFacebook size={20}/>
                        </span>
                        </a>
                        <a
                            href="https://www.facebook.com/profile.php?id=100011595158136"
                            target="_blank"
                            rel="noreferrer"
                            className={`${styles.icfaces}`}
                        >
                            <span className={`icon flex items-center ${styles.ictwitter}`} >
                            <BiLogoTwitter size={20}/>
                        </span>
                        </a>
                        <a
                            href="https://www.facebook.com/profile.php?id=100011595158136"
                            target="_blank"
                            rel="noreferrer"
                            className={`${styles.icfaces}`}
                        >
                           <span className={`icon flex items-center ${styles.icinsta}`} >
                            <PiInstagramLogoDuotone size={20}/>
                        </span>
                        </a>
                        <a
                            href="https://www.facebook.com/profile.php?id=100011595158136"
                            target="_blank"
                            rel="noreferrer"
                            className={`${styles.icfaces}`}
                        >
                            <span className={`icon flex items-center ${styles.iclink}`} >
                            <BiLogoLinkedin size={20}/>
                        </span>
                        </a>
                    </ul>





                </div>
                <div className="w-full md:w-1/4 ps-5  ">
                    <h2 className={`${styles.compContact}`}>Contact</h2>
                    <div className={`${styles.compContactBlock}`}>

                    <span className={`-ms-4 icon flex items-center ${styles.icLoc}`} >
                            <FaLocationDot size={20}/>
                        <h3 className={` ps-2`}>  7P24+G56, Hardaspur, Punjab 144411.</h3>
                        </span>
                        <span className={`-ms-4 mt-4 icon flex items-center ${styles.icMail}`} >
                            <HiMail size={20}/>
                        <h3 className={` ps-2 `}> kuldeepmourya09@gmail.com</h3>
                        </span>
                        <span className={`-ms-4 mt-4 icon flex items-center ${styles.icMob}`} >
                            <HiDevicePhoneMobile size={20}/>
                        <h3 className={` ps-2`}>7007834160</h3>
                        </span>
                    </div>



                </div>
                <div className="w-full md:w-1/4 ps-5  ">
                    <h2 className={`${styles.compSupport}`}>Support</h2>

                    <div className={`${styles.compContactSupport}`}>
                        <h3 className={`text-white ms-1`}>faq</h3>
                        <h3 className={`text-white mt-4 ms-1`}>Shipping & Returns</h3>
                        <h3 className={`text-white mt-4 ms-1`}>Contact Us</h3>
                        <h3 className={`text-white mt-4 ms-1`}>Our Partners</h3>
                    </div>
                </div>
                <div className="w-full md:w-1/4 ps-5 ">
                    <h2 className={`${styles.compinfo}`}>Info</h2>

                    <div className={`${styles.compContactSupport}`}>
                        <h3 className={`text-white ms-1`}>About Us</h3>
                        <h3 className={`text-white mt-4 ms-1`}>Our Stores</h3>
                        <h3 className={`text-white mt-4 ms-1`}>Size Guide</h3>
                        <h3 className={`text-white mt-4 ms-1`}>Our Piercing Services</h3>
                    </div>
                </div>




            </div>
        </div>
    );
};

export default Footer;