import React from 'react';
import styles from "./fastdelivery.module.css";
import Image from "next/image";
import cup from "../../../../public/ImgSrc/cofycup.png";
import leaf from "../../../../public/ImgSrc/leafdel.png";
import cube from "../../../../public/ImgSrc/cube3d.png";
import scooter from "../../../../public/ImgSrc/delscooter.png";
import scooterDrive from "../../../../public/ImgSrc/scooterDrive.gif";
import Navbar from "../Navbar/Navbar";



const FastFoodDeliveryService = () => {
    return (
        <div className={`mt-10 sm:mt-32 ${styles.fastDel}`}>
                <div className="flex flex-col md:flex-row">
                    <div className={`w-full md:w-1/2 ${styles.fastDel1}`}>
                        <Image src={scooterDrive} alt="Leaf" className={`${styles.ScooterDrive}`}  priority/>
                    </div>

                    <div className={`w-full md:w-1/2  ${styles.fastDel2}`}>
                        <Image src={leaf} alt="Leaf" className={`${styles.TLeaf}`}  priority/>



                        <div className={`flex  ${styles.fastDel2main}`}>`


                            <span className={ `${styles.fastDel2mainspan1}`}></span>
                            <span className={ `${styles.fastDel2mainspan2}`}></span>
                            <span className={ `${styles.fastDel2mainspan2}`}></span>
                            <div className={`${styles.fastDel2main2}`}>
                                <h2 className={`${styles.fastDel2main21}`}>Faster Food Delivery <code></code>  service <Image src={scooter} alt="del" className={`${styles.delscooter}`}  priority/></h2>
                                <h1  className={`${styles.fastDel2main22}`}>Get delivered while it is still hot.</h1>
                                <h3 className={`${styles.fastDel2main23}`}>Satisfy your cravings ASAP! Our speedy delivery ensures you enjoy mouthwatering meals without the wait.</h3>
                                <h1 className={`${styles.fastDel2main24}`}><strong>GET STARTED</strong></h1>

                            </div>


                        </div>
                        <Image src={cup} alt="cup" className={`${styles.fastcup}`}  priority/>
                        <Image src={cube} alt="cube" className={`${styles.fastcube}`}  priority/>


                    </div>


                </div>





        </div>
    );
};

export default FastFoodDeliveryService;