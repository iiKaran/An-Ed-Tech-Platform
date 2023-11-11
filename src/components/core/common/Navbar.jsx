import React from 'react'
import { Link, matchPath } from 'react-router-dom'
// project_code/src/assets
import Logo from "./Logo-Full-Light.png"
import { NavbarLinks } from './nav-data/navbar-links'
import { useLocation } from 'react-router-dom'
export default function Navbar() {
  const location = useLocation();
  const matchRoute= (route)=>{
    return matchPath({path:route},location.pathname)
  }
  return (
    <div className='flex h-14 border-b-[1px]  border-b-richblack-700'>

       <div className='w-[70vw] flex mx-auto border maz-w-max-content items-center justify-between'>
      <Link to="/">
        <img src={Logo} width={160} height={42} loading='lazy' alt="" />
      </Link>
   
      <nav>
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
  
     <div className="btns flex gap-x-4 items-center">
      {/* login/signup/dashboard */}


     </div>

      </div>        
    </div>
  )
}
