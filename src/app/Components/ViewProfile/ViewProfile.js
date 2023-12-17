"use client";
import React, {useContext, useEffect, useState} from 'react';
import UserContext from "../../../context/userContext";
import styles from "./viewprofile.module.css";
import {HiOutlinePencilSquare} from "react-icons/hi2";
import {BiSolidPhoneCall} from "react-icons/bi";
import {SiGmail, SiMinutemailer, SiProtonmail} from "react-icons/si";
import {signup, updateUserDetail} from "@/services/userService";
import Cropper from "../Avatar/Avatar";
import {toast} from "react-toastify";
import {HashLoader} from "react-spinners";
import {RxCross2} from "react-icons/rx";

const ViewProfile = () => {
    const context=useContext(UserContext);
    const [openUpdate,setOpenUpdate]=useState(false);
    const [loader,setLoader]=useState(false);

    const [data,setData]=useState({
        name:context.user?.name,
        mobile:context.user?.mobile,
        secure_url:context.user?.secure_url,
        public_id:context.user?.public_id
    });
    const storageKey = 'tempImageData';
    const imgDataURL = localStorage.getItem(storageKey);

    useEffect(() => {
        if (imgDataURL) {
            setData({ ...data, secure_url: imgDataURL });
        }
    }, [imgDataURL]);
    const handleUpdateButton=async (e)=>{
        e.preventDefault();

        try{
            setLoader(true);

            console.log(data);
            const result=await updateUserDetail(context.user._id,data);
            console.log(String(result.message));

            context.setUser({...context.user,name:data.name,mobile:data.mobile,secure_url:data.secure_url,public_id:String(result.message)});
            console.log(context.user)
            console.log(data);


            localStorage.removeItem(storageKey);
            setLoader(false);
            setTimeout(() => {
                setOpenUpdate(false);

                setTimeout(() => {
                    context.setViewProfileCard(false);
                   }, 1000);
            }, 500);

        }
        catch (e) {
            console.log(e);

        }
    }


    return (
        <div className={` ${styles.cardMain}`}>
            <div className={` pt-3 pb-5 ${styles.topSection}`}>
                <RxCross2 size={30} className={`cursor-pointer text-white absolute top-1 right-2 active:rotate-90`} onClick={()=>{context.setViewProfileCard(false)}} />
                <Cropper className={`rounded-full w-28 mx-auto ${styles.viewImg}`}/>
                <h2 className={`text-white text-center my-3 font-bold`}>{context.user?.name}</h2>
                <h3 className={`flex justify-center items-center text-white -mt-2 pb-2 text-sm`}><BiSolidPhoneCall size={25}/> {context.user?.mobile}</h3>
                <h3 className={`flex justify-center items-center text-white -mt-2 text-sm`}><SiMinutemailer size={25} className={`mr-1`}/>{context.user?.email}</h3>
            </div>

            <div className={`flex flex-col justify-center items-center ${openUpdate ? styles.openBottomSection : styles.closeBottomSection } text-center pb-3`}>
                {openUpdate ?
                    <div className={`relative `}>
                        <form className={`mt-3 text-left ${loader?'blur':''}`} onSubmit={handleUpdateButton}>
                            <div className="mb-3">
                                <label htmlFor="nameInput" className={`text-white text-sm ${styles.labelStyle}`}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="nameInput"
                                    placeholder="Please enter Your Name"
                                    className={`text-gray-400 pl-2`}
                                    value={data.name}
                                    onChange={e=>setData({...data,name:e.target.value})}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="phoneInput" className={`text-white text-sm ${styles.labelStyle}`}>
                                    Mob
                                </label>
                                <input
                                    type="number"
                                    id="phoneInput"
                                    placeholder="Please enter Your Phone Number"
                                    className={`text-gray-400 pl-2`}
                                    value={data.mobile}
                                    onChange={e=>setData({...data,mobile:e.target.value})}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="emailInput" className={`text-white text-sm ${styles.labelStyle}`}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="emailInput"
                                    value={context.user?.email}
                                    disabled
                                    className={`text-gray-400 pl-2`}
                                />
                            </div>

                            <div className={`text-center`}>
                            <input type="submit" value="Update" className={`${styles.submitButton} -ml-3`} />
                            <button onClick={()=>{setOpenUpdate(false)}} className={`${styles.cancelButton} ml-3`}>Cancel</button>
                            </div>
                        </form>
                        <div className={`absolute top-14 left-24`}>
                        {loader &&
                            <>
                        <HashLoader color="#ff8166" />
                        </>
                        }
                        </div>
                    </div> :
                    <>
                        <h2 className={`${styles.updateButton} text-sm font-bold  `} onClick={()=>{
                            setOpenUpdate(true)
                        }}>Update</h2>
                        <h2 className={`mt-6 text-slate-400 text-sm flex `}>Click me to update Your Profile <HiOutlinePencilSquare className={`-mt-1 ml-2 text-slate-400`} size={20}/></h2>
                    </>
                }
            </div>

        </div>
    );
};

export default ViewProfile;