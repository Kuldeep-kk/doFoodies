import React from 'react';
import styles from "./layout.module.css";
import Image from "next/image";
import sn from "../../../../public/ImgSrc/LoginImg.png"
import PageWrapper from "@/app/PageWrapper";
import lf from "../../../../public/ImgSrc/leafAnim.png";



const Layout = ({children}) => {
    return (
        <div className={`container-fluid  ${styles.authMain} lg:mb-7 md:mb-7 `}>
            <div className={`flex flex-col md:flex-row relative ${styles.authMainrow}`}>
                <div className={`w-full md:w-1/2   ${styles.authMain1}`}>
                    <Image src={sn} alt="Leaf" className={`${styles.sn}`}  priority/>
                </div>
                <div className={`w-full md:w-1/2  ${styles.authMain2}`}>
                    <PageWrapper>
                    {children}

                    </PageWrapper>
                    <Image src={lf} alt="Leaf" className={`w-24 -right-7 absolute -bottom-1`}  priority/>

                </div>

            </div>

        </div>
    );
};

export default Layout;