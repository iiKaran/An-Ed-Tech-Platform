import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/core/DashBoardPage/SideBar'
export default function DashBoard() {
  return (
    <div className='text-white  flex  flex-start gap-12 relative'>
      <div className='dashboard-links bg-richblack-800  brightness-90    h-[100vh]'>
          <SideBar/>
      </div >

        <Outlet></Outlet>
    </div>
  )
}
