import React, {useContext, useEffect, useState} from 'react';
import styles from './popularproduct.module.css'
import Image from "next/image";

import Bline from "../../../../public/ImgSrc/ppbottomLine.png";
import SLeaf from "../../../../public/ImgSrc/ppSiedlead.png";
import UserContext from "../../../context/userContext";
import GridMenuCard from "../GridMenuCard/GridMenuCard";





const PopularProduct = () => {


    const context=useContext(UserContext);

    function getRandomFoodItems(menuItems, count) {
        const shuffledItems = menuItems.sort(() => 0.5 - Math.random()); // Shuffle the array
        return shuffledItems.slice(0, count); // Get the first 'count' items
    }

    const [randomFoodItems, setRandomFoodItems] = useState([]);



    useEffect(() => {

        context.load
        if(context.menu && JSON.stringify(context.menu).length>2) {
            const selectedItems = getRandomFoodItems(context.menu, 4);
            setRandomFoodItems(selectedItems);
        }
    }, [context.menu]);
    return (
        <div className={`container-fluid mt-7 ${styles.popularp} ml-6`} >
            <div className="text-center">
                <p className={`${styles.osTag}`}>
                   ONLINE STORE

                </p>
            </div>
            <div className="text-center">
                <h1 className={`${styles.osPPHead}`}> Popular Products</h1>


            </div>
            <div className={`text-center ${styles.bottomLineDiv}`}>
                <Image src={Bline} alt="bottomLine" className={``}  priority/>


            </div>
            <Image src={SLeaf} alt="SideLeaf" className={`${styles.SLeaf}`}  priority/>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-20 md:mx-32 mb-12 -mt-9 ">
                {(randomFoodItems && JSON.stringify(randomFoodItems).length>2)  &&
                    <>

                            {Object.values(randomFoodItems).map((item) => (
                                <GridMenuCard key={item._id} {...item} />
                            ))}
                    </>
                }
            </div>


        </div>
    );
};

export default PopularProduct;