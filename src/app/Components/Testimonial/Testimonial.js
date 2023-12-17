import React from 'react';
import styles from "./testimonial.module.css";
import Image from "next/image";
import Bline from "../../../../public/ImgSrc/ppbottomLine.png";
import SLeaf from "../../../../public/ImgSrc/ppSiedlead.png";
import img1 from "../../../../public/ImgSrc/tmimg1.png";
import img2 from "../../../../public/ImgSrc/tmimg2.png";


const Testimonial = () => {
    return (
        <div className={`mt-10 m-auto ${styles.tmMain}`}>
            <div className="text-center">
                <p className={`${styles.tmTag}`}>
                    TESTIMONIAL

                </p>
            </div>
            <div className="text-center">
                <h1 className={`${styles.tmHead}`}> What they saying</h1>


            </div>
            <div className={`text-center ${styles.tmbottomLineDiv}`}>
                <Image src={Bline} alt="bottomLine" className={``}  priority/>


            </div>
            <Image src={SLeaf} alt="SideLeaf" className={`${styles.tmLeaf}`}  priority/>
            <div className="flex flex-col md:flex-row">
                <div className={`${styles.beforeimg1}`}></div>
                <div className={`w-full md:w-1/2  ${styles.tmDel1}`}>
                    <Image src={img1} alt="bottomLine" className={`${styles.img1}`}  priority/>
                    <div className={`${styles.tmbox1}`}>
                        <h2 className={`${styles.tmbox1head}`}>
                            Kanchan Katal
                        </h2>
                        <h3>California</h3>

                        <p className={`${styles.tmbox1text}`}>
                            I absolutely love this <code>food website!</code> The variety of recipes is incredible,
                            and the step-by-step instructions make it so easy to follow. The ingredients are always <code>fresh</code>,
                            and the flavors are <code>outstanding</code>.
                            It has become my go-to source for delicious meals. Highly recommend!
                        </p>

                    </div>



                </div>


                <div className={`w-full md:w-1/2 ${styles.tmDel2}`}>

                    <Image src={img2} alt="bottomLine" className={`${styles.img2}`}  priority/>
                    <div className={`${styles.tmbox2}`}>
                        <h2 className={`${styles.tmbox2head}`}>
                            Natasha Malik
                        </h2>
                        <h3>California</h3>

                        <p className={`${styles.tmbox2text}`}>
                            I cant believe I stumbled upon this incredible <code>food website!</code>
                            The variety of mouthwatering dishes and easy-to-follow recipes has truly transformed my cooking experience.
                            The user-friendly interface and detailed ingredient lists make it a breeze to create <code>delicious</code> meals.
                            Thanks to this site!
                        </p>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Testimonial;