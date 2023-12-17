import React, {useState} from 'react';
import styles from './listmenucard.module.css';
import {TbShoppingCartPlus} from "react-icons/tb";
import {AiOutlineHeart} from "react-icons/ai";
import {FaOpencart} from "react-icons/fa";
import Image from "next/image";
import leaf from "../../../../public/ImgSrc/vegLeaf.png";
import {RiHeart2Fill} from "react-icons/ri";
import {HiMiniShoppingBag} from "react-icons/hi2";

const ListMenuCard = ({title, desc, category, food, price, secure_url,addedDate}) => {

    const currentDate = new Date();
    const givenDate = new Date(addedDate);
    const timeDifference = currentDate - givenDate;
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    const [expanded, setExpanded] = useState(false);

    const toggleDescription = () => {
        setExpanded(!expanded);
    };


    const truncatedDesc = !expanded ? `${desc.split(' ').slice(0, 12).join(' ')}` :desc;

    return (
        <div className={`relative ${styles.listFood}`}>
            {(daysDifference<5) && <><div className={`absolute right-0 -top-2 ${styles.newTag}`}>{(daysDifference<5)?<>New</>:<></>}</div> </>}

            {(food==="veg") && <>
                <div className={`absolute -right-7 -bottom-1`}>
                    <Image src={leaf} alt={"veg"} className={`w-10`}/>
                </div>
            </>}

        <div className={`grid grid-cols-12 mt-3  py-3 px-3 ${styles.mainList} `}>
            <div className={`col-span-1 flex items-center justify-center ${styles.imgDiv}`}>
                <img src={secure_url} className={`${styles.SFood}`}/>
            </div>
            <div className="col-span-8 px-3">
                <div className={`font-semibold`}>{title}</div>
                <div className={`text-gray-500 text-sm justify-center`}>
                    {expanded ? desc : truncatedDesc}
                    {desc.split(' ').length > 12 && (
                        <span className={`${styles.expandText} hover:cursor-pointer text-sm`} onClick={toggleDescription}>
                                {expanded ? <span className={`text-red-500`}>less</span> : <span className={`text-blue-400`}>...more</span>}
              </span>
                    )}
                </div>
            </div>
            <div className="col-span-1 flex items-center justify-center "><strong>₹</strong><code className={`text-green-400 text-2xl`}>{price}</code></div>
            <div className="col-span-1 flex items-center justify-center "><RiHeart2Fill size={25} className={` ${styles.cardsy2}`}/></div>
            <div className="col-span-1 flex items-center justify-center"><HiMiniShoppingBag size={25} className={` ${styles.cardsy3}`}/></div>
        </div>
        </div>
    );
};

export default ListMenuCard;