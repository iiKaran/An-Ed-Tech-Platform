import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import HighLightText from './HighLightText';
import {BsFillFileEarmarkPersonFill} from 'react-icons/bs'
const tabmenu =
    [
        "Free",
        "New to coding",
        "Most popular",
        "Skills paths",
        "Career paths"
    ]


export default function ExploreMore() {
    const [currentTab, setCurrentTab] = useState(tabmenu[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    function setMyCards(value) {
        console.log(value);
        setCurrentTab(value);
        const result = HomePageExplore.filter(course => course.tag == value);
        console.log(result);
        setCourses(result[0].courses)
        setCurrentCard(result[0].courses[0].heading);
        console.log("the courser are", result[0].courses);


    }
    return (

        <div className='hidden lg:block'>
            <h1 className='capitialize text-[2.7vw] text-center '>Unlock the <HighLightText text="Power of code" /></h1>
            <div className='  flex gap-4  w-[100%] mt-4 justify-center items-center'>
                {
                    tabmenu.map((element, index) => {
                        return (
                            <div key={index} className={`text-[13px] cursor-pointer  px-3 py-1 rounded-lg   ${element === currentTab ? "text-white bg-richblack-900 border" : "text-richblack-200 bg-richblack-700"}`} onClick={() => setMyCards(element)}>
                                {element}
                            </div >)
                        // { console.log("hes") }
                    })
                }
            </div>

            <div className='cards flex gap-2 mt-14'>
                {courses.map((element, index) => {
                    return (
                    <div className={`mb-14 card ${index==0? "bg-white text-richblue-200 brightness-100":"bg-richblack-800"}  text-richblack-300 p-5 pb-2 rounded-lg`}>
                        <h3 className={`px-7  brightness-90 font-bold mb-4 text-[2vw] ${index==0? " text-richblack-900 brightness-100":"text-white"} `}>{element.heading}</h3>
                         <p className='mb-6 text-[18px]'>
                            {element.description}
                         </p>
                         <div className="flex text-[17px] justify-between border-spacing-8">
                         <span className='flex items-center gap-2' >
                         <BsFillFileEarmarkPersonFill/> {element.level}
                            </span>
                            <span>
                                {element.lessionNumber} Lessons
                            </span>
        
                         </div>
                    </div>
                )
                })}
            </div>

        </div>
    )
}
