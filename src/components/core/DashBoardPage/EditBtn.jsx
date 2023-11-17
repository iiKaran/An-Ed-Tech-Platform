import React from 'react'
import { LuClipboardEdit } from "react-icons/lu";
export default function 
() {
  return (
    <div className='flex bg-yellow-50 rounded-md cursor-pointer  text-black gap-3 justify-center w-[100px] py-3 items-center absolute top-5 right-12'>
        <span className=''>
        <LuClipboardEdit />
        </span>
        <span>
            Edit 
        </span>
    </div>
  )
}
