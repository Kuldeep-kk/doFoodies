"use client";
import React, {useContext, useEffect, useState} from 'react';

import styles from "./menu.module.css";
import {IoGrid} from "react-icons/io5";
import {RiListCheck2} from "react-icons/ri";
import Image from "next/image";
import {BiSearchAlt} from "react-icons/bi";
import {GiChickenOven} from "react-icons/gi";
import {FaBowlFood} from "react-icons/fa6";
import {HiOutlineStar, HiStar} from "react-icons/hi";
import {GrPowerReset} from "react-icons/gr";
import {RxCross2} from "react-icons/rx";
import {showFoodMenu} from "../../services/menuService";
import GridMenuCard from "../Components/GridMenuCard/GridMenuCard";
import NoFIlterGif from "../../../public/ImgSrc/noFilterG.gif";
import ListMenuCard from "../Components/ListMenuCard/ListMenuCard";
import Cart from "../Components/Cart/Cart";
import UserContext from "../../context/userContext";
import PageWrapper from "../PageWrapper";
import { motion, AnimatePresence } from "framer-motion";
import {TbAdjustmentsCancel} from "react-icons/tb";
import ViewProfile from "@/app/Components/ViewProfile/ViewProfile";
import WishCards from "@/app/Components/WishCards/WishCards";


const Menu = () => {

    const [priceRange,setPriceRange]=useState(100);
    const [menu,setMenu]=useState(undefined);
    const [isGridSelectedLayout, setIsGridSelectedLayout] = useState(true);
    const [foodSearch,setFoodSearch]=useState("");
    const [openFilter,setOpenFilter]=useState(false);
    const context=useContext(UserContext);

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
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };







    const pricefn=(event)=>{
        setPriceRange(event.target.value);
        setFilter((prevState)=>({
            ...prevState,
            range:"under ₹"+ event.target.value,
        }));


    }
    const [selectedFoodOption, setSelectedFoodOption] = useState('All');

    const handleSelectFoodChange = (event) => {
        setSelectedFoodOption(event.target.value);

        if(event.target.value !== 'All' ) {
            setFilter((prevState) => ({
                ...prevState,
                foodtype:event.target.value,
            }));
        }
        if(event.target.value === 'All' ) {

            setFilter((prevState) => {
                const updatedObject = {...prevState};
                delete updatedObject['foodtype'];
                return updatedObject;
            });
        }
    };

    //-----------Handling Filter------------
    const [filterVar,setFilterVar]=useState('');
    const [filter,setFilter]=useState({});
    const handleRating4=()=>{
        setFilterVar("4 star & above");
        setFilter((prevState)=>({
            ...prevState,
            rating:"4 star & above",
        }));
    }
    const handleRating3=()=>{
        setFilterVar("3 star & above");
        setFilter((prevState)=>({
            ...prevState,
            rating:"3 star & above",
        }));
    }
    const handleRating2=()=>{
        setFilterVar("2 star & above");
        setFilter((prevState)=>({
            ...prevState,
            rating:"2 star & above",
        }));
    }
    const handleRating1=()=>{
        setFilterVar("1 star & above");
        setFilter((prevState)=>({
            ...prevState,
            rating:"1 star & above",
        }));
    }


    const [vegVar,setVegVar]=useState('');
    const objectToArray = Object.entries(filter);


    console.log(filter);

    const removePFilter=(keyRemove)=>{

        setFilter((prevState) => {
            const updatedObject = { ...prevState };
            delete updatedObject[keyRemove];
            return updatedObject;
        });

    }
    const filterDataBase=async ()=>{
        const filterMenu=menu.filter(item=>{
            if(filter.food && item.food!==filter.food){
                return false;
            }
            return true;
        })
        await setMenu([...filterMenu]);


    }
    useEffect(() => {
        async function loadMenu(){
            try{
                const menuItems=await showFoodMenu();
                const maxPrice = filter.range ? parseInt(filter.range.slice(7)) : Infinity;
                const foodType=filter.foodtype?.split(' ').join('').toLowerCase();
                await setMenu({...menuItems});

                const filterMenu=menuItems.filter(item=>{

                    if(filter.food && item.food!==filter.food){
                        return false;
                    }
                    if(filter.foodtype && item.category !== foodType){
                        return false;
                    }
                    if (foodSearch && !item.title.toLowerCase().includes(foodSearch.toLowerCase())) {
                        return false;
                    }
                    return item.price<= maxPrice;





                })
                await setMenu([...filterMenu]);

                console.log(filterMenu);
                console.log(menuItems);
            }
            catch (e) {
                alert("Not getting food item from database!!!");

            }
        }
        loadMenu();

    }, [filter,foodSearch]);

    const handleSearch=(e)=>{
        e.preventDefault();
    }


    return (
        <PageWrapper>
            <div className={`flex flex-col pt-28 md:flex-row  ${styles.MenuHead} relative`}>
                <div className={` fixed w-80 top-36 ${styles.cartStyle} backdrop-blur ${context.isCartOpen ?`right-0`:`-right-96`}`}>

                    <Cart/>
                </div>

                <div className={`hidden lg:w-1/4 lg:block md:hidden ${styles.sideBarFoodie}`}>
                    <div className={styles.searchHeader}>foodie Search</div>
                    <form className={`${styles.getmail}`} onSubmit={handleSearch}>
                        <input type="text" placeholder="Search any food..." required className={`${styles.mailInput}`}
                               onChange={e=>{
                                   setFoodSearch(e.target.value);
                               }}/>
                        <button type="submit"><BiSearchAlt size={25} /></button>
                    </form>
                    <div className={`${styles.radioFoodBox} sm:flex  flex-row`}  >
                        <label htmlFor="veg" className={`${styles.radioVegLabel}`}><span>V</span>eg</label> <FaBowlFood size={25} color={"#63b706"}/>
                        <input type="radio" id="veg" name="food" value="veg" className={`${styles.radioVeg}`} checked={filter.food==='veg'}  onChange={e=>{setVegVar('veg');  setFilter((prevState)=>({
                            ...prevState,
                            food:"veg",
                        }));  }}/>
                        <label htmlFor="nveg " className={`${styles.radioNVegLabel}`}><span>N</span>on-<span>V</span>eg</label><GiChickenOven size={30} color={"orangered"}/>
                        <input type="radio" id="nveg" name="food" value="nveg" className={`${styles.radioNVeg}`} onChange={e=>{setVegVar('nveg');   setFilter((prevState)=>({
                            ...prevState,
                            food:"nonveg",
                        }));}}/>

                    </div>
                    <div className={`${styles.priceFilterBox}`}>
                        <span className={`${styles.priceTagHead}  sm:flex  flex-row justify-center`}>Price Range</span>

                        <input type="range" min="10cla" step="50" value={priceRange} max="1000" onChange={pricefn} className={`${styles.priceSlider}`}/>
                        <span className={`${styles.priceTag}  sm:flex  flex-row justify-center`}>[ <span className={`${styles.priceTag1}`}>₹</span> 1 <span className={`${styles.priceTag3}`}>-</span>  <span className={`${styles.priceTag2}`}>₹</span> {priceRange} ]</span>

                    </div>
                    <div className={`${styles.ratingBox}`}>
                        <h2>Avg. Customer Rating </h2>
                        <div className={` sm:flex  flex-row justify-center`} onClick={handleRating4}><span className={` sm:flex  flex-row ${styles.ratingArea}`}><HiStar size={25} className={`${styles.ratingStar}`}/><HiStar size={25} className={`${styles.ratingStar}`}/><HiStar size={25} className={`${styles.ratingStar}`}/><HiStar size={25} className={`${styles.ratingStar}`}/><HiOutlineStar size={23} className={`${styles.ratingStar}`}/> <span className={`${styles.postRatingWord}`}>& Up</span> </span></div>
                        <div className={` sm:flex  flex-row justify-center`} onClick={handleRating3}><span className={` sm:flex  flex-row ${styles.ratingArea}`}> <HiStar size={25} className={`${styles.ratingStar}`}/><HiStar size={25} className={`${styles.ratingStar}`}/><HiStar size={25} className={`${styles.ratingStar}`}/><HiOutlineStar size={23} className={`${styles.ratingStar}`}/> <HiOutlineStar size={23} className={`${styles.ratingStar}`}/><span className={`${styles.postRatingWord}`}>& Up</span></span></div>
                        <div className={` sm:flex  flex-row justify-center`} onClick={handleRating2}><span className={` sm:flex  flex-row ${styles.ratingArea}`}><HiStar size={25} className={`${styles.ratingStar}`}/><HiStar size={25} className={`${styles.ratingStar}`}/> <HiOutlineStar size={23} className={`${styles.ratingStar}`}/> <HiOutlineStar size={23} className={`${styles.ratingStar}`}/> <HiOutlineStar size={23} className={`${styles.ratingStar}`}/> <span className={`${styles.postRatingWord}`}>& Up</span></span></div>
                        <div className={` sm:flex  flex-row justify-center`} onClick={handleRating1}><span className={` sm:flex  flex-row ${styles.ratingArea}`}><HiStar size={25} className={`${styles.ratingStar}`}/><HiOutlineStar size={23} className={`${styles.ratingStar}`}/><HiOutlineStar size={23} className={`${styles.ratingStar}`}/> <HiOutlineStar size={23} className={`${styles.ratingStar}`}/> <HiOutlineStar size={23} className={`${styles.ratingStar}`}/>  <span className={`${styles.postRatingWord}`}>& Up</span></span></div>

                    </div>

                    <GrPowerReset size={30} className={`${styles.resetFilterButton}`} onClick={()=>{
                        setFilter({});
                    }} />

                    {Object.keys(filter).length > 0 &&(<div className={`${styles.selectFilterBox}`}>
                        <h2>
                            Filter
                        </h2>

                        <ul>
                            {objectToArray.map(([key, value]) => (
                                <li key={key} className={`${styles.filterAttr}`}>
                                    {value}  <RxCross2 size={20} className={`${styles.removePFilter}`} onClick={() => removePFilter(key)}  />


                                </li>
                            ))}
                        </ul>
                    </div>)}




                </div>
                <div className={`w-full lg:w-3/4 h-screen  `}>
                    <form className={`${styles.getmail} lg:hidden `} onSubmit={handleSearch}>
                        <input type="text" placeholder="Search any food..." required className={`${styles.mailInput}`}
                               onChange={e=>{
                                   setFoodSearch(e.target.value);
                               }}/>
                        <button type="submit"><BiSearchAlt size={25} /></button>
                    </form>

                    <div className={`flex flex-row ${styles.MenuSectionHead}  pt-3 pb-10 pr-5 pl-10 lg:pb-4`}>

                        <div className={`hidden lg:block lg:w-1/2 `}>
                            <span className={`${styles.MenuSectionHeadTitle}`}>Category:</span>
                            <select value={selectedFoodOption} className={`${styles.selectFoodOption}`} onChange={handleSelectFoodChange}>
                                <option value="All">All</option>
                                <option value="Lunch or Dinner">Lunch or Dinner</option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Dessert">Desserts</option>
                            </select>
                        </div>
                        <div className={`w-1/2 lg:hidden`}><div className={` w-24 text-md flex items-center text-white bg-orange-600 border-x-8 rounded scale-105 pl-3.5  active:scale-75`} onClick={()=>setOpenFilter(!openFilter)}><TbAdjustmentsCancel/>fitler</div></div>
                        <div className={`w-full md:w-1/2  sm:flex relative  flex-row ${styles.menuLayout}`}>
                            <span className={`absolute flex text-center cursor-pointer duration-300  pt-1 mr-2 ${isGridSelectedLayout ? `${styles.selectedLayoutGrid}` : `${styles.normalLayoutGrid}`}`} onClick={() => setIsGridSelectedLayout(!isGridSelectedLayout)} ><IoGrid size={22} className={``}/><span className={`text-black-50 ml-1 ${isGridSelectedLayout ? 'block' : 'hidden'}`}>Grid</span></span>
                            <span className={`absolute  flex text-center cursor-pointer duration-300  pt-1  ${!isGridSelectedLayout ? `${styles.selectedLayoutList}` : `${styles.normalLayoutList}`}`} onClick={() => setIsGridSelectedLayout(!isGridSelectedLayout)}><RiListCheck2 size={25} className={``}/><span className={`text-black-50 ml-1 ${!isGridSelectedLayout ? 'block' : 'hidden'}`}>List</span></span>

                        </div>

                    </div>

                    <div className={`lg:hidden`}>
                    {Object.keys(filter).length > 0 &&(<div className={`${styles.selectFilterBox}`}>
                        <h2>
                            Filter
                        </h2>

                        <ul className={`mt-2 md:flex`}>
                            {objectToArray.map(([key, value]) => (
                                <li key={key} className={`relative items-center bg-gray-400 opacity-75 w-32 md:w-auto rounded-3xl m-auto mb-2`}>
                                    <h3 class={`text-center text-white py-1 md:px-10`}>{value}</h3>  <RxCross2 size={20} className={`absolute top-1.5 -right-5 active:rotate-90 text-red-500`} onClick={() => removePFilter(key)}  />


                                </li>
                            ))}
                        </ul>
                        <GrPowerReset size={30} className={`m-auto -mb-4 active:rotate-90`} onClick={()=>{
                            setFilter({});
                        }} />
                    </div>)}
                    </div>



                    <div className={`mt-4 px-5 ${styles.heightMenu} overflow-y-auto `}>
                        {(menu && JSON.stringify(menu).length>2)  ? <>
                            {isGridSelectedLayout? <>
                                    <motion.div
                                    className={`grid gap-3 mt-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1`}
                                        variants={variants}
                                        initial="hidden"
                                        animate="show"
                                    >
                                        {Object.values(menu).map((item) => (
                                            <motion.div
                                                key={item._id}
                                                variants={images}

                                            >
                                                <GridMenuCard key={item._id} {...item} />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </>:
                                <>
                                    <div className={``}>
                                        {Object.values(menu).map((item) => (
                                            <ListMenuCard key={item._id} {...item} />
                                        ))}
                                    </div>

                                </>}


                        </>:<>
                            <div className={`text-center mt-28`}>
                                <Image src={NoFIlterGif} alt={"No Filter Found"} className={`m-auto w-48`} />
                                <h2 className={`text-gray-400`}> !!! No Data Found !!!</h2>
                            </div>
                        </>
                        }

                    </div>


                </div>

            </div>

            <AnimatePresence>
                {context.viewProfileCard && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                        <div
                            className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-75 backdrop-blur-sm"
                            onClick={()=>{context.setViewProfileCard(false)}}

                        />
                        <motion.div
                            initial={{ y: 50, opacity: 0,scale:0 }}
                            animate={{ y: 0, opacity: 1,scale:1 }}
                            exit={{ y: 50, opacity: 0,scale:0 }}
                            className="fixed transform">
                            <ViewProfile />

                        </motion.div>
                    </motion.div>
                )}
                {context.viewWishCard && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                        <div
                            className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-75 backdrop-blur-sm"
                            onClick={()=>{context.setViewWishCard(false)}}

                        />
                        <motion.div
                            initial={{ y: 50, opacity: 0,scale:0 }}
                            animate={{ y: 0, opacity: 1,scale:1 }}
                            exit={{ y: 50, opacity: 0,scale:0 }}
                            className="fixed transform">
                            <WishCards/>

                        </motion.div>
                    </motion.div>
                )}
                {openFilter && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                        <div
                            className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-75 backdrop-blur-sm"
                            onClick={()=>{setOpenFilter(false)}}

                        />
                        <motion.div
                            initial={{ y: 50, opacity: 0,scale:0 }}
                            animate={{ y: 0, opacity: 1,scale:1 }}
                            exit={{ y: 50, opacity: 0,scale:0 }}
                            className="fixed transform">
                            <div className={`bg-white shadow-xl rounded-3xl pb-5 w-72`}>
                            <div className={`${styles.searchHeader} relative`}>foodie Search <RxCross2 size={30} className={`absolute top-1 right-1 active:rotate-90`} onClick={()=>setOpenFilter(false)}/></div>
                                <div className={`text-center items-center `}>
                                    <span className={`${styles.MenuSectionHeadTitle}`}>Category:</span>
                                    <select value={selectedFoodOption} className={`${styles.selectFoodOption} mt-2`} onChange={handleSelectFoodChange}>
                                        <option value="All">All</option>
                                        <option value="Lunch or Dinner">Lunch or Dinner</option>
                                        <option value="Breakfast">Breakfast</option>
                                        <option value="Dessert">Desserts</option>
                                    </select>
                                </div>
                            <div className={`${styles.radioFoodBox} flex justify-between`}  >
                                <label htmlFor="veg" className={`${styles.radioVegLabel}`}><span>V</span>eg</label> <FaBowlFood size={25} color={"#63b706"}/>
                                <input type="radio" id="veg" name="food" value="veg" className={`${styles.radioVeg}`} checked={filter.food==='veg'}  onChange={e=>{setVegVar('veg');  setFilter((prevState)=>({
                                    ...prevState,
                                    food:"veg",
                                }));  }}/>
                                <label htmlFor="nveg " className={`${styles.radioNVegLabel}`}><span>N</span>on-<span>V</span>eg</label><GiChickenOven size={30} color={"orangered"}/>
                                <input type="radio" id="nveg" name="food" value="nveg" className={`${styles.radioNVeg}`} onChange={e=>{setVegVar('nveg');   setFilter((prevState)=>({
                                    ...prevState,
                                    food:"nonveg",
                                }));}}/>

                            </div>
                            <div className={`${styles.priceFilterBox} text-center`}>
                                <span className={`${styles.priceTagHead}  sm:flex  flex-row justify-center`}>Price Range</span>

                                <input type="range" min="10" step="1" value={priceRange} max="1000" onChange={pricefn} className={`${styles.priceSlider}`}/>
                                <span className={`${styles.priceTag}  sm:flex  flex-row justify-center`}>[ <span className={`${styles.priceTag1}`}>₹</span> 1 <span className={`${styles.priceTag3}`}>-</span>  <span className={`${styles.priceTag2}`}>₹</span> {priceRange} ]</span>

                            </div>
                            <div className={`${styles.ratingBox}`}>
                                <h2>Avg. Customer Rating </h2>
                                <div className={` flex justify-center`} onClick={handleRating4}><span className={` flex  ${styles.ratingArea}`}><HiStar size={25} className={`${styles.ratingStar}`}/><HiStar size={25} className={`${styles.ratingStar}`}/><HiStar size={25} className={`${styles.ratingStar}`}/><HiStar size={25} className={`${styles.ratingStar}`}/><HiOutlineStar size={23} className={`${styles.ratingStar}`}/> <span className={`${styles.postRatingWord}`}>& Up</span> </span></div>
                                <div className={` flex justify-center`} onClick={handleRating3}><span className={` flex ${styles.ratingArea}`}> <HiStar size={25} className={`${styles.ratingStar}`}/><HiStar size={25} className={`${styles.ratingStar}`}/><HiStar size={25} className={`${styles.ratingStar}`}/><HiOutlineStar size={23} className={`${styles.ratingStar}`}/> <HiOutlineStar size={23} className={`${styles.ratingStar}`}/><span className={`${styles.postRatingWord}`}>& Up</span></span></div>
                                <div className={` flex justify-center`} onClick={handleRating2}><span className={`flex ${styles.ratingArea}`}><HiStar size={25} className={`${styles.ratingStar}`}/><HiStar size={25} className={`${styles.ratingStar}`}/> <HiOutlineStar size={23} className={`${styles.ratingStar}`}/> <HiOutlineStar size={23} className={`${styles.ratingStar}`}/> <HiOutlineStar size={23} className={`${styles.ratingStar}`}/> <span className={`${styles.postRatingWord}`}>& Up</span></span></div>
                                <div className={` flex justify-center`} onClick={handleRating1}><span className={`flex ${styles.ratingArea}`}><HiStar size={25} className={`${styles.ratingStar}`}/><HiOutlineStar size={23} className={`${styles.ratingStar}`}/><HiOutlineStar size={23} className={`${styles.ratingStar}`}/> <HiOutlineStar size={23} className={`${styles.ratingStar}`}/> <HiOutlineStar size={23} className={`${styles.ratingStar}`}/>  <span className={`${styles.postRatingWord}`}>& Up</span></span></div>

                            </div>
                            </div>






                        </motion.div>
                    </motion.div>
                )}

            </AnimatePresence>
        </PageWrapper>

    );
};

export default Menu;