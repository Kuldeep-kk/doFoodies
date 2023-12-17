"use client";
import React, {useContext, useEffect, useState} from 'react';
import Image from "next/image";
import Logo  from '../../../../public/ImgSrc/myLogo.png'
import Link from "next/link";
import styles from './navbar.module.css'

import {
    AiOutlineMenu,
    AiOutlineClose,
    AiOutlineInstagram,
    AiOutlineFacebook,
    AiOutlineTwitter, AiTwotoneShop,
} from "react-icons/ai";

import UserContext from "../../../context/userContext";
import {usePathname, useRouter} from "next/navigation";
import {logout} from "@/services/userService";
import {HiHome, HiShoppingBag} from "react-icons/hi";
import {CgUserlane} from "react-icons/cg";
import {SiPayloadcms} from "react-icons/si";
import {GrDropbox} from "react-icons/gr";
import {TbLogout2} from "react-icons/tb";
import {AnimatePresence, motion} from "framer-motion";
import {MdRestaurantMenu} from "react-icons/md";
import {BiMessageSquareEdit} from "react-icons/bi";
import {signOut} from "next-auth/react";

const links = [
    { href: "/Home", text: "home" },
    { href: "/About", text: "about" },
    { href: "/Menu", text: "menu" },
    { href: "/Feedback", text: "feedback" },

];
const iconMapping = {
    home: <HiHome />,
    about: <AiTwotoneShop />,
    menu: <MdRestaurantMenu />,
    feedback: <BiMessageSquareEdit />,
};
const  Navbar = () => {

    const path = usePathname();

    const router = useRouter();
    const [dropUser,setDropUser]=useState(false);
    const context = useContext(UserContext);
    const [user, setUser] = useState(context.user);

    console.log(context);

    const [selectedNav,setSelectedNav]=useState(context.selectNav);
    const [menuOpen,setMenuOpen]=useState(false);
    const handleNav=()=>{
        setMenuOpen(!menuOpen);
        console.log(menuOpen);

    }
    useEffect(() => {
        setUser(context.user);

    }, [context.user]);

    useEffect(() => {
        setSelectedNav(context.selectNav);
    }, [context.selectNav]);
    const doLogout=async ()=>{
        try{
            const result=await logout();

            context.setUser(undefined);
            router.push('/Login');
            signOut();
            setDropUser(!dropUser);

        }
        catch (e) {
            console.log(e);

        }
    }
    //-------------------------cart data-----------------------

    useEffect(() => {
        if(context.user){
            context.loadCartItem(context.user._id);
            context.loadPosterImage();
            context.loadMenu();
        }

    }, [context.user]);
    const toggleCards = () => {
        context.setViewProfileCard(!context.viewProfileCard);
        setDropUser(false);
    };

    const toggleWishCards = async () => {
        context.setViewWishCard(!context.viewWishCard);
        setDropUser(false);
        await context.loadWishItem(context.user._id);
    };




    return (

        <nav className={`relative w-full h-20  ${styles.NavS}`}>
            <div className="flex justify-between items-center h-full w-full px-4 2xl:px-16 focus:outline-none">
                <Link href='/'>
                    <Image src={Logo} alt={Logo} width="180" height="75" className="cursor-pointer p-3 -ml-1 " priority/>
                </Link>
                <div className={`hidden sm:flex m-auto ${styles.navigationStyle}`}>
                    {user && ( <>
                        <ul className="hidden sm:flex">
                            {links.map((l) => (
                                <li className=" lg:mr-10 md:mr-5 hover:border-b text-lg active:scale-75 " key={l.href}>
                                    <motion.div whileHover={{ scale: 1.1 }} className={`flex items-center`}>
                                        <div className={`md:hidden lg:block mr-2 ${ l.href === path ? `text-gray-500 `:`text-gray-300`}`} style={{ fontSize: '25px' }}>{iconMapping[l.text] }</div>

                                        <Link
                                            className={`${
                                                l.href === path ? "text-red-500  border-b border-green-400" : "text-zinc-500"
                                            } font-semibold `}
                                            href={l.href}
                                        >
                                            {l.text}
                                        </Link>
                                    </motion.div>
                                </li>
                            ))}

                        </ul>
                    </>)}

                </div>
                {user && <>
                <div  className=" sm:hidden cursor-pointer pl-24 focus:outline-none bg-transparent active:outline-none ">
                    <AiOutlineMenu size={25} onClick={handleNav}  />

                </div>

                <div className={`sm:hidden cursor-pointer absolute top-24 right-0 ${styles.cartButtonMobile}`}>
                    <div className={`relative`} onClick={(e)=>{
                        context.setCartOpen(!context.isCartOpen);
                    }}>
                        <HiShoppingBag size={25} className="mr-5 text-slate-600" />
                        <span className={`absolute -top-3 right-2 bg-red-500 rounded-3xl p-1 text-xs text-white`} >{context.cartItem?.length}</span>
                    </div>
                </div>
                </>}

                <div className={` hidden sm:flex  flex-row justify-around items-center w-200 cursor-pointer m-4 ${styles.dropDownUser}`}>
                    {user && (<>

                        <img className={`rounded-full mr-4`} src={user.secure_url} alt={"pic"} width="40px" />
                        <h2 className={`mr-6`} onClick={()=>{
                            setDropUser(!dropUser);
                        }}>{user.name}</h2>

                        <div className={`relative`} onClick={(e)=>{
                            context.setCartOpen(!context.isCartOpen);
                        }}>
                            <HiShoppingBag size={25} className="mr-5" />
                            <span className={`absolute -top-3 right-2 bg-red-500 rounded-3xl p-1 text-xs text-white`} >{context.cartItem?.length}</span>
                        </div>




                    </>)}
                    {dropUser && (
                        <div className={`${styles.dropDownUserMenu} py-3 px-2`}>
                            <div className={`${styles.mainList} py-3 px-2`}>
                                <div className={`flex mb-1 ${styles.listItem}`} onClick={toggleCards}><CgUserlane size={20} className={`mr-2`}/>Profile</div>
                                <div className={`flex mb-1 ${styles.listItem}`} > <SiPayloadcms size={20} className={`mr-2`}/>Orders</div>
                                <div className={`flex mb-1 ${styles.listItem}`} onClick={toggleWishCards}><GrDropbox size={20} className={`mr-2`}/>Wish List</div>
                                <div className={`flex ${styles.listItemOut}`} onClick={doLogout}><TbLogout2 size={20} className={`mr-2`}/>Logout</div>

                            </div>
                        </div>


                    )}




                </div>

            </div>
            {user && <>
            <div className={` top-0 w-[65%] h-screen
                ${menuOpen ? `fixed left-0  sm:hidden  bg-[#ecf0f3] opacity-95 pt-5 p-10 ease-in duration-500 ${styles.sizeNav}`:
                    `fixed left-[-100%]  p-10 ease-in duration-500 ${styles.sizeNav}` } `}>

                <img className={`rounded-full m-auto shadow shadow-gray-400 shadow-xl`} src={user.secure_url} alt={"pic"} width="100px" />
                <h2 className={`text-center font-semibold text-slate-500 mt-4`}>{user.name}</h2>


                <div className={`flex-col py-4 `}>
                    <ul>
                        {links.map((l) => (
                            <li className="py-4 cursor-pointer hover:border-b text-lg  text-gray-400" key={l.href}>

                                <motion.div whileHover={{ scale: 1.1 }} className={`flex items-center`}>
                                    <div className={`mr-2 ${ l.href === path ? `text-gray-500 `:`text-gray-400`}`} style={{ fontSize: '30px' }}>{iconMapping[l.text] }</div>
                                    <Link
                                        className={`${
                                            l.href === path ? "text-red-500  border-b border-green-400 -py-5" : "text-zinc-500"
                                        } font-semibold `}
                                        href={l.href} onClick={()=>setMenuOpen(false)}
                                    >
                                        {l.text}
                                    </Link>
                                </motion.div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={`absolute bottom-16`}>

                <div class={`grid grid-cols-2 gap-1`}>
                <div className={`col-span-1 flex mb-1 items-center ${styles.buttonSideNav} active:scale-75`} onClick={()=>{setMenuOpen(false);toggleCards()}}><CgUserlane size={20} className={`mr-0.5`}/>Profile</div>
                <div className={`col-span-1 flex mb-1  items-center ${styles.buttonSideNav} active:scale-75`} onClick={()=>{setMenuOpen(false);}}> <SiPayloadcms size={20} className={`mr-0.5`}/>Orders</div>
                </div>
                <div className={`flex  mb-1 ${styles.buttonSideNav} active:scale-75`} onClick={()=>{setMenuOpen(false);toggleWishCards()}}><GrDropbox size={20} className={`mr-2 ml-6`}/>Wish List</div>



                <div className="flex flex-row justify-around pt-10 items-center">

                    <AiOutlineInstagram size={30} className="cursor-pointer"/>
                    <AiOutlineFacebook size={30} className="cursor-pointer"/>
                    <AiOutlineTwitter size={30} className="cursor-pointer"/>
                </div>
                <Link href='/'>
                    <Image src={Logo} alt={Logo} width="150" height="75" className="cursor-pointer pt-6 " priority/>
                </Link>
                <div className={`flex items-center ${styles.logoutBtnSideNav} mt-2 active:scale-75`} onClick={()=>{setMenuOpen(false);doLogout()}}><TbLogout2 size={25} className={`ml-9 mr-2  text-white`}/><h2 className={`text-xl  text-white`}>Logout</h2></div>
                </div>

            </div>
                    </>}



        </nav>
    );
};

export default Navbar;