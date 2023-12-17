"use client";
import React, {useContext, useState} from 'react';
import styles from './cartitem.module.css';
import Image from 'next/image';
import {TbSquareRoundedPlusFilled} from "react-icons/tb";
import {FaMinus, FaPlus} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {RxCross2} from "react-icons/rx";
import {decrementCartItem, deleteCart, incrementCartItem} from "../../../services/cartServices";
import {toast} from "react-toastify";
import UserContext from "../../../context/userContext";
import { motion, AnimatePresence } from "framer-motion";


const CartItem = ({data}) => {
    const variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const images = {
        hidden: {
            opacity: 0,
            x: 30,
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 1
            },
        },
    };
    const { _id, title, food, price, addedDate,quantity, secure_url,} = data;
    const context=useContext(UserContext)

    const [expanded, setExpanded] = useState(false);

    const toggleDescription = () => {
        setExpanded(!expanded);
    };

    const deleteItem=async (itemId)=>{
        try {
            const result=await deleteCart(itemId);
            console.log(result);
             await context.loadCartItem(context.user._id);

            toast.success("Item Deleted");

        }
        catch (e) {
            console.log(e);
            toast.error("Error on deleting");

        }
    }



    const decrementfn=(userId,itemId)=>{
        if(quantity===1)
        {
            deleteItem(itemId);

        }
        else if(quantity>1){
            quantityDec(userId,itemId);
        }
    }

    const quantityDec=async (userId,itemId)=>{
        try{
            console.log(userId,itemId)
            const result=await decrementCartItem(userId,itemId);
            console.log(result);
            await context.loadCartItem(context.user._id);

            toast.success("cart inc");


        }
        catch (e) {
            console.log(e);
            toast.error("Error on Inc");


        }
    }


    const truncatedDesc = !expanded ? `${title.split(' ').slice(0, 2).join(' ')}` :title;
    return (
        <div
    className={`grid grid-cols-12 m-2 ${styles.cartCard} relative`}>
            <RxCross2 size={18} className={`${styles.Cross} absolute right-1 top-1`} onClick={()=>{deleteItem(_id)}}/>
            <div className={` col-span-3 flex items-center justify-center `}>
               <img src={secure_url} alt='foodItem' className={`${styles.cartImage}`}/>

            </div>
            <div className={` col-span-9 p-2`}>
                <div className={`${styles.cartTitle}`}>
                    {expanded ? title : truncatedDesc}
                    {title.split(' ').length > 2 && (
                        <span className={`${styles.expandText} hover:cursor-pointer text-sm`} onClick={toggleDescription}>
                                {expanded ? <span className={`text-red-500`}>less</span> : <span className={`text-blue-400`}>...more</span>}
              </span>
                    )}
                </div>
                <div className={`grid grid-cols-12`}>

                    <div className={`col-span-4 text-center`}><strong className={`text-blue-400`}>₹</strong><code className={`text-[#ef4444]`}>{price}</code></div>
                    <div className={`col-span-8 text-center  flex justify-between px-7`}><FaMinus className={`mt-1 ${styles.minusCart}`} onClick={()=>{decrementfn(context.user._id,_id)}}/><span className={`text-l font-bold text-blue-400`}>{quantity}</span><FaPlus className={`mt-1 ${styles.plusCart}`} onClick={()=>{context.quantityInc(context.user._id,_id)}}/></div>


                </div>


            </div>

        </div>
    );
};

export default CartItem;