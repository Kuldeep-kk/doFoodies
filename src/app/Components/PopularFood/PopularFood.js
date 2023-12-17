"use client";
import React, {useContext, useEffect, useState} from 'react';
import styles from "./popularfood.module.css";
import Image from "next/image";
import SLeaf from "../../../../public/ImgSrc/sideLeaf.png";
import pleaf from "../../../../public/ImgSrc/popularfoodleaf.png";
import UserContext from "../../../context/userContext";
import GridMenuCard from "@/app/Components/GridMenuCard/GridMenuCard";

const PopularFood = () => {

    const context=useContext(UserContext);

    const [visibleCount, setVisibleCount] = useState(6);
    const [foodItems, setFoodItems] = useState([]);
    const [isExpanded, setIsExpanded] = useState(true);

    useEffect(() => {
        if (context.menu && context.menu.length > 0) {
            // Slice the first 12 items initially
            setFoodItems(context.menu.slice(0, visibleCount));
        }
        if (context.menu.length <= visibleCount) {
            setIsExpanded(false);
        }
    }, [context.menu, visibleCount]);

    const handleViewMore = () => {
        setVisibleCount(prevCount => prevCount + 6);
        if (context.menu.length <= visibleCount + 6) {
            setIsExpanded(false);
        }
    };
    const handleCollapse = () => {
        setVisibleCount(6);
        setIsExpanded(true);
    };

    return (
        <div className={`${styles.popularf} mb-32`}>
            <div className={`text-center`}>
                <p className={`${styles.osTag}`}>
                    POPULAR MENU

                </p>
            </div>
            <div>
                <h1 className={`m-auto ${styles.osPPHead}`}> Amazing Food Served With Delicacy</h1>
            </div>

            <Image src={SLeaf} alt="SideLeaf" className={`${styles.SLeaf}`}  priority/>

            <Image src={pleaf} alt="leaf" className={`${styles.Pleaf}`}  priority/>
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 mx-20 md:mx-10 lg:mx-56`}>
                {(foodItems && JSON.stringify(foodItems).length>2)  &&
                    <>

                        {Object.values(foodItems).map((item) => (
                            <GridMenuCard key={item._id} {...item} />
                        ))}
                    </>
                }
            </div>
            <div className={`${styles.seeMenu}`} >
                {isExpanded ? (
                    <span
                        className={`${styles.homebuttonmenu} `}
                        onClick={handleViewMore}
                    >
                        See All Menu
                    </span>
                ) : (
                    <span
                        className={`${styles.homebuttonmenu} `}
                        onClick={handleCollapse}
                    >
                        Collapse
                    </span>
                )}
            </div>
        </div>
    );
};

export default PopularFood;