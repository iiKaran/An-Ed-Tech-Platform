import React from 'react'
import { Link } from 'react-router-dom'
export default function FormInput() {
  return (
    <Link to={linkto}>
      <div className={` text-center capitalize text-[13px] px-6 py-3  font-bold rounded-lg ${active? "bg-yellow-50 text-black":"bg-richblack-800"} `}>
        {children}  
      </div> 
    </Link>
  )
}
