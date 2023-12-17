import React, {useContext, useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UserContext from "../../../context/userContext";
import GridMenuCard from "../GridMenuCard/GridMenuCard";
import styles from "./wishcards.module.css";
import {RxCross2} from "react-icons/rx";
const SelectionComponent = () => {
    const context=useContext(UserContext);

    return (
        <div className={` container mx-auto p-5 relative ${styles.mPage}`}>
            <h2 className={`${styles.headTitle} text-4xl text-center`}><span className={`text-6xl`}>W</span>ISH<span className={`text-6xl`}>L</span>ISTS</h2>
            <RxCross2 size={30} className={`cursor-pointer text-white absolute top-1 right-2 active:rotate-90`}  onClick={()=>{context.setViewWishCard(false)}} />
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 overflow-y-auto overflow-x-hidden p-3">
                {context.wishItem ? <>
                        {context.wishItem.map((item) => (
                    <motion.div
                        key={item._id}
                        layoutId={item._id}
                        className={`p-2 transition-transform transform hover:scale-105`}
                    >

                        <motion.div><GridMenuCard key={item._id} {...item} /></motion.div>

                    </motion.div>
                ))}
                </>
                :<>
                    <h2>Loading......</h2>
                    </>}
            </div>


        </div>
    );
};
export default SelectionComponent;
