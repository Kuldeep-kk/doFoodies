"use client";
import React, {useState} from 'react';
import styles from '@/app/Components/FormBox/formbox.module.css';
import Logo from '../../../../public/ImgSrc/formLogo.gif';
import formCorner from "../../../../public/ImgSrc/formCorner.png";
import Image from "next/image";
import {BiMessageSquareEdit} from "react-icons/bi";
import {LuPenLine} from "react-icons/lu";
import {RxCross2} from "react-icons/rx";
import ContactForm from "@/app/Components/Form/ContactForm";
import EnquiryForm from "@/app/Components/Form/EnquiryForm";
import PageWrapper from "@/app/PageWrapper";
const FormBox = ({formtype,sendDataToParent}) => {


    const [selectedForm,setSelectedForm]=useState(formtype);

    return (
        <div className={` ${styles.mainFormBox} relative`}>
            <Image src={formCorner} alt={"img"} className={`absolute w-64 -bottom-5 right-0`}/>
            <RxCross2 size={30} className={`cursor-pointer text-slate-300 absolute top-2 right-3 active:rotate-90`} onClick={()=>sendDataToParent(false)} />
            <div className={`flex flex-row justify-between  w-60 m-auto mt-4 border-2 rounded-xl h-10 cursor-pointer shadow-xl`}>
                <div className={`w-1/2 text-center rounded-l-xl items-center ${styles.feedbackButton} flex ${selectedForm === 'feedback' ? `text-white ${styles.selectedFormButton}`: 'text-slate-500'}`} onClick={()=>setSelectedForm('feedback')}><BiMessageSquareEdit size={25} className={`ml-2 mr-1`}/>Feedback</div>
                <div className={`w-1/2 text-center rounded-r-xl items-center  ${styles.enquiryButton} flex ${selectedForm === 'enquiry' ? `text-white ${styles.selectedFormButton} `: 'text-slate-500'}`} onClick={()=>setSelectedForm('enquiry')}><LuPenLine size={25} className={`mr-2 ml-3`}/>Enquiry</div>
            </div>

            {selectedForm ==="feedback" ? <ContactForm/> : <EnquiryForm/>}

        </div>
    );
};

export default FormBox;