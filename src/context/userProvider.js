"use client";


import {useEffect, useState} from "react";
import {currentUser, landingData} from "@/services/userService";
import UserContext from "../context/userContext";
import {LoadingTImeFn} from "@/app/Components/LoadingTImeFn";
import {incrementCartItem, showCart} from "@/services/cartServices";
import {toast} from "react-toastify";
import {showFoodMenu} from "@/services/menuService";
import {showWish} from "@/services/wishServices";
import {SessionProvider} from "next-auth/react";

const UserProvider=({children})=>{
    const [user,setUser]=useState(undefined);
    const [isCartOpen,setCartOpen]=useState(false);
    const [loading, setLoading] = useState(true);
    const [cartItem,setCartItem]=useState([]);
    const [wishItem,setWishItem]=useState([]);
    const [totalPrice,setTotalPrice]=useState(0);
    const [poster,setPoster]=useState([]);
    const [menu,setMenu]=useState([]);
    const [viewProfileCard,setViewProfileCard]=useState(false);
    const [viewWishCard,setViewWishCard]=useState(false);

    const loadPosterImage=async ()=>{
        try{
            console.log("Its a  poster Image");
            const data=await landingData();

            console.log(data);
            setPoster(data);
        }
        catch (e) {

        }
    }
    const loadMenu=async ()=>{
        try {
            const menuItems=await showFoodMenu();
            setMenu(menuItems);
        }
        catch (e) {
            console.log(e);

        }

    }


    useEffect(() => {

        async function load(){
            try {

                const logUser = await currentUser();
                setUser({...logUser});
                if(logUser){
                    LoadingTImeFn();
                }
                console.log(logUser);
            }
            catch (e) {
                console.log(e);

            }
            finally {
                setLoading(false);
            }
        }
        load();
        loadPosterImage();
        loadMenu();
    }, []);


    async function loadCartItem(userId){
        try{
            const item=await showCart(userId);
            console.log(item)
            setCartItem(item);
            console.log(cartItem);
            setTotalPrice(item.reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0));



        }
        catch (e) {
            console.log(e);

        }
    }

    async function loadWishItem(userId){
        try{
            const item =await showWish(userId);
            console.log("its a wishlisty data");
            console.log(item);
            setWishItem(item);

        }
        catch (e) {
            console.log(e);

        }
    }
    const quantityInc=async (userId,itemId)=>{
        try{
            console.log(userId,itemId)
            const result=await incrementCartItem(userId,itemId);
            console.log(result);
            await loadCartItem(user._id);

            toast.success("cart inc");

        }
        catch (e) {
            console.log(e);
            toast.error("Error on Inc");


        }
    }
    async function loadMyDataFromServer(){
        try {

            const logUser = await currentUser();
            setUser({...logUser});
            if(logUser){
                LoadingTImeFn();
            }
            console.log(logUser);
        }
        catch (e) {
            console.log(e);

        }
    }



    return(
        <UserContext.Provider value={{user,setUser,isCartOpen,setCartOpen,cartItem,setCartItem,loadCartItem,quantityInc,totalPrice,poster,menu,viewProfileCard,setViewProfileCard,viewWishCard,setViewWishCard,loadWishItem,wishItem,loadPosterImage,loadMenu,loadMyDataFromServer}}>
            <SessionProvider>
            {loading ? (

               <></>

            ) : (
                children
            )}
            </SessionProvider>
        </UserContext.Provider>
    );
};

export default UserProvider;