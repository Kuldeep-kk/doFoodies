"use client";
import React, {useContext, useEffect, useState} from 'react';
import {AiOutlineHeart, AiOutlineShareAlt} from "react-icons/ai";
import Image from "next/image";
import styles from "./gridmenucard.module.css";
import {TbShoppingCartPlus} from "react-icons/tb";
import leaf from "../../../../public/ImgSrc/vegLeaf.png";
import UserContext from "../../../context/userContext"
import {addCart} from "../../../services/cartServices";
import {toast} from "react-toastify";
import {RiHeart2Fill} from "react-icons/ri";
import {HiMiniShoppingBag} from "react-icons/hi2";
import {addItemWishList} from "../../../services/wishServices";
import PageWrapper from "../../PageWrapper";
import { motion, AnimatePresence } from "framer-motion";




const GridMenuCard = ({ _id ,title, desc, category, food, price, secure_url,addedDate}) => {

    const variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                duration: 0.5, // Adjust the animation duration as needed
            },
        },
    };

    const images = {
        hidden: { opacity: 0, y: 20 }, // You can adjust the initial position
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5, // Adjust the animation duration as needed
            },
        },
    };

    const context=useContext(UserContext);

    const [expanded, setExpanded] = useState(false);

    const currentDate = new Date();
    const givenDate = new Date(addedDate);
    const timeDifference = currentDate - givenDate;
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    const [item, setItem]=useState({

        title:title?title:"",
        price:price?price:"",
        desc:desc?desc:"",
        secure_url:secure_url?secure_url:"",
        quantity:1,
        userId:context.user?context.user._id:"",
        food:food?food:"",

    });


    const toggleDescription = () => {
        setExpanded(!expanded);
    };


    const truncatedDesc = !expanded ? `${desc.split(' ').slice(0, 5).join(' ')}` :desc;

    const handleAddCartButton=async ()=>{
        try{

            const isCartHave=context.cartItem.find(itemc => itemc.title === item.title);
            if(isCartHave){
                 context.quantityInc(item.userId,isCartHave._id);

            }
            else{
                const result= await addCart(item);
                console.log(result);
                await context.loadCartItem(context.user._id);
                toast.success("Item added to cart",{
                    position:"bottom-right"
                });
            }
        }
        catch (e) {
            console.log(e);
            toast.success("Failed to add to cart",{
                position:"top-center"
            });

        }
    }

    const handleWishList=async ()=>{
        try{
            const result = await addItemWishList(item);
            console.log(result);


        }
        catch (e) {
            console.log(e);

        }
    }

    const addToCart=()=>{

    }

    return (
        <PageWrapper>
            <div
                 className={`card  text-center ${styles.cardFood} relative`}>
            {(daysDifference<5) && <><div className={`absolute right-0 -top-2 ${styles.newTag}`}>{(daysDifference<5)?<>New</>:<></>}</div> </>}

            {(food==="veg") && <>
            <div className={`absolute -left-1 -top-2 `}>
                 <Image src={leaf} alt={"veg"} className={`w-10`}/>
             </div>
            </>}

            <div
               className={`card-h ${styles.cardData}`}>
                <img src={secure_url} alt="SideLeaf" className={` card-img-top mx-auto  mt-4  w-36 ${styles.SFood}`}   />

                <div className="card-body ">
                    <h5 className={`card-title ${styles.cardHeading}`}>
                        {title}
                    </h5>
                    <p className={`card-text ${styles.cardText}`} >
                        {expanded ? desc : truncatedDesc}
                        {desc.split(' ').length > 5 && (
                            <span className={`${styles.expandText} hover:cursor-pointer text-sm`} onClick={toggleDescription}>
                                {expanded ? <span className={`text-red-500`}>less</span> : <span className={`text-blue-400`}>...more</span>}
              </span>
                        )}
                    </p>
                    <div className={` relative`}>
                        <h2 className={` ${styles.cardsy1} pl-7 pb-2`}> <strong>₹</strong><code>{price}</code></h2>
                        <span className={`${styles.span2} absolute bottom-3 right-16`} ><RiHeart2Fill size={25} className={` ${styles.cardsy2}`} onClick={handleWishList}/></span>
                        <span className={`${styles.span3} absolute bottom-3 right-8`} ><HiMiniShoppingBag size={25} className={` ${styles.cardsy3}`} onClick={handleAddCartButton}/></span>
                    </div>
                </div>
            </div>
        </div>
        </PageWrapper>
    );
};

export default GridMenuCard;