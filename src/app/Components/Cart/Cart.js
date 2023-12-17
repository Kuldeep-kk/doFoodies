"use client";
import React, {useContext, useEffect, useState} from 'react';
import styles from './cart.module.css';
import {RxCross2} from "react-icons/rx";
import CartItem from "../../Components/CartItem/CartItem";
import {deleteALlCartItem, showCart} from "../../../services/cartServices";
import UserContext from "../../../context/userContext";
import {toast} from "react-toastify";
import Swal from "sweetalert2";
import Image from "next/image";
import emptyCart from "../../../../public/ImgSrc/emptycart.gif";

const Cart = () => {
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
    const context=useContext(UserContext);
    let totalPrice=100;

    const warnDel=(userId)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteAll(userId);
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    const deleteAll=async (userId)=>{
        try {
            console.log(userId)
            const result =await deleteALlCartItem(userId);

            console.log(result);
            await context.loadCartItem(context.user._id);
            context.setCartOpen(false);


        }
        catch (e) {
            console.log(e);
            toast.error("Failed to Delete All Data!!!");
        }
    }
    return (
        <div className={`${styles.mainCart} relative`}>
            <h1 className={`${styles.cartHead}`}>Cart</h1>
            <RxCross2 size={25} className={`${styles.Cross} absolute right-3 top-2`} onClick={(e)=>{
                context.setCartOpen(false);
            }}/>
            <hr/>
            <div className={`flex justify-between mt-1`}>
                <h1 className={`text-gray-400`}>Items : {context.cartItem?.length}</h1>
                {context.cartItem?.length>0 && <h1 className={`${styles.clearAll}`} onClick={()=>{
                    context.setCartOpen(false);
                    warnDel(context.user._id)
                }}>clear all</h1>}
            </div>

            <div className={`${styles.cartItem}  overflow-y-auto`}>
                {context.cartItem?.length>0 ? <>

                {context.cartItem.map((item) => (
                    <CartItem key={item._id} data={item}/>
                ))}
                </>:
                <>
                    <Image src={emptyCart} alt={"Cart is Empty"} className={`mt-5`}/>
                    <h2 className={`text-center mt-3`}>Your cart is empty</h2>
                </>}
            </div>
            <div className={` mt-3 ${styles.cartBottom}`}>
                <div className={`flex justify-between p-3`}>
                    <h1 className={`text-gray-500 `}>Sub Total</h1>
                    <h1><strong className={`text-blue-400`}>₹</strong><code className={`text-[#ef4444] text-xl`}>{context.totalPrice}</code></h1>
                </div>
                <div className={`flex justify-between p-3`}>
                    <h1 className={`text-gray-500 `}>Delivery</h1>
                    <h1><strong className={`text-blue-400`}>₹</strong>{context.totalPrice>0 ? <code className={`text-[#ef4444]`}>49</code>:<code>0</code> }</h1>
                </div>
                <div className={`${styles.checkOut}`}>
                    Check Out
                </div>



            </div>





        </div>
    );
};

export default Cart;