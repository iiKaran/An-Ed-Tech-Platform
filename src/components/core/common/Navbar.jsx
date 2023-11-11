import React from 'react'
import { Link, matchPath } from 'react-router-dom'
// project_code/src/assets
import Logo from "./Logo-Full-Light.png"
import { NavbarLinks } from './nav-data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from 'react-icons/ai'
export default function Navbar() {
  const location = useLocation();
  const {token} = useSelector((state)=>state.auth); 
  const {cart} = useSelector((state)=>state.cart); 
  const {user} = useSelector((state)=>state.profile);
  const {totalItems} = useSelector((state)=> state.cart);
  const matchRoute= (route)=>{
    return matchPath({path:route},location.pathname)
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
         NavbarLinks.map((element , index)=>(
             <li key={index}>
               {
               element.title == "Catalog"?(<div></div>):
               <Link to={element?.path}> 
               <p className={`${matchRoute(element?.path)?"text-yellow-25":"text-richblack-25"}`}>
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
                        <button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Sign Up
                        </button>
                    </Link>
                )
            }
     </div>

      </div>        
    </div>
  )
}
