import React from 'react';
import styles from "./downloadapp.module.css"
import Image from "next/image";
import Mobile from "../../../../public/ImgSrc/phone.png";
import QR from "../../../../public/ImgSrc/qr.png";

const DownloadApp = () => {
    return (
        <div className={`m-auto ${styles.mobileApp}`}>
            <div className="flex flex-col md:flex-row">
                <div className={`w-full md:w-1/2 ${styles.fastDel1}`}>
                    <Image src={Mobile} alt="Leaf" className={`${styles.mobile}`}  priority/>

                </div>

                <div className={`w-full md:w-1/2  ${styles.fastDel2}`}>
                    <div className={`${styles.phoneMain}`}>
                        <p className={`${styles.qrtext}`}>
                            SCAN THIS QR CODE

                        </p>
                        <h1  className={`${styles.qrhead}`}>Its all here.</h1>
                        <h1  className={`${styles.qrhead2}`}>All in one  webapp.</h1>

                        <Image src={QR} alt="Leaf" className={`${styles.qr}`}  priority/>

                        <p className={`${styles.qrQuotes}`}>Discover local, on-demand delivery or Pickup from
                        restaurants, nearby grocery and convenience stores, and more.</p>
                    </div>


                </div>

            </div>

        </div>
    );
};

export default DownloadApp;