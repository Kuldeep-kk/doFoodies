import React from 'react';
import styles from "./specialdiscount.module.css";
import Image from "next/image";
import Bline from "../../../../public/ImgSrc/ppbottomLine.png";

const SpecialDiscount = () => {

    return (
        <div className={`m-auto mt-10 ${styles.sdMain}`}>
            <div className="text-center">
                <p className={`${styles.sdTag}`}>
                    Get Special Discounts

                </p>
            </div>
            <div className={`text-center ${styles.spbottomLineDiv}`}>
                <Image src={Bline} alt="bottomLine" className={``}  priority/>
            </div>
            <div className="text-center">
                <p className={`${styles.sdQuotes1}`}>
                    Input email address and complete your subscription to

                </p>

            </div>
            <div className="text-center">
                <p className={`${styles.sdQuotes2}`}>
                    get our special offer.

                </p>

            </div>
            <form className={`${styles.getmail}`}>
                <input type="text" placeholder="Enter your email..." required className={`${styles.mailInput}`}/>
                    <button type="submit">Get Started</button>
            </form>
            
        </div>
    );
};

export default SpecialDiscount;