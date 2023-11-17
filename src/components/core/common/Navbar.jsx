import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
// project_code/src/assets
import Logo from "./Logo-Full-Light.png"
import { NavbarLinks } from './nav-data/navbar-links'
import { useLocation } from 'react-router-dom'
import { IoIosArrowDropdownCircle } from "react-icons/io"
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropDown from '../auth/ProfileDropDown'
import { apiConnector } from '../../../services/apiconnector'
import { categories } from '../../../services/apis'
export default function Navbar() {
    // const subLinks = [
    //     {
    //         title: "python",
    //         link: "/catalog/python"
    //     },
    //     {
    //         title: "web dev",
    //         link: "/catalog/web-development"
    //     },
    // ];
    const [subLinks,setSubLinks] = useState([])

    useEffect(async ()=>{
        try{
        console.log("hee;");
        const {CATEGORIES_API} = categories ;
        const response = await apiConnector("GET", CATEGORIES_API);
        console.log("object giv", response.data.data);
        if(response.data.data.length==0)
        {
            setSubLinks([{
                name:"No Element found",
                index:"0"
            }])
            return ;
        }
        setSubLinks(response.data.data);
        }
       catch(err){
        console.log("cant get the categories");
       }
    },[])
    const location = useLocation();
    const { token } = useSelector((state) => state.auth);
 
    const { cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    console.log("object", token, user);
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }
    return (
        <div className='flex mt-3 h-14 border-b-[1px]  border-b-richblack-700'>

            <div className='w-[90vh] lg:w-[70vw] flex mx-auto  maz-w-max-content items-center justify-between'>
                <Link to="/">
                    <img src={Logo} width={160} height={42} loading='lazy' alt="" />
                </Link>

                <nav className='hidden lg:block'>
                    <ul className='flex gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map((element, index) => (
                                <li key={index}>
                                    {
                                        element.title == "Catalog" ? (

                                            <div className='relative flex items-center gap-2 group'>
                                                <p>{element.title}</p>
                                                <IoIosArrowDropdownCircle />

                                                <div className='invisible absolute left-[50%]
                    translate-x-[-50%] translate-y-[10%]
                 top-[50%]
                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                opacity-0 transition-all duration-200 group-hover:visible
                group-hover:opacity-100 lg:w-[300px]'>

                                                    <div className='absolute left-[50%] top-0
                translate-x-[80%]
                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                                    </div>

                                                    {
                                                        subLinks.length ? (
                                                            subLinks.map((subLink, index) => (
                                                                <Link to={`/dashoard/${subLink.name}` } key={index} className=' w-[100%] p-1'>
                                                                    <p className='mt-2 hover:opacity-50'>{subLink.name}</p>
                                                                </Link>
                                                            ))
                                                        ) : (<div></div>)
                                                    }

                                                </div>


                                            </div>

                                        ) :
                                            <Link to={element?.path}>
                                                <p className={`${matchRoute(element?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                    {element.title}
                                                </p>
                                            </Link>

                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                <div className="btns flex gap-x-4  items-center">
                    {/* login/signup/dashboard */}
                    {
                        user && user?.accountType != "Instructor" && (
                            <Link to="/dashboard/cart" className='relative'>
                                <AiOutlineShoppingCart />
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                        
                        token !== null  && <ProfileDropDown></ProfileDropDown>

                    }
                </div>

            </div>
        </div>
    )
}
