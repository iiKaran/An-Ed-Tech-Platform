import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EditBtn from '../components/core/DashBoardPage/EditBtn'
import { Link } from 'react-router-dom'

export default function Myprofile() {
  const { user } = useSelector((state) => state.profile)
  const { open } = useSelector((state) => state.modal)
  // console.log("the modal value is ", open)
  return (
    <>
   {!open? <div className='text-white  lg:w-[70vw]  px-6 flex flex-col gap-8'>
      <h1 className='font-extrabold text-[2vmax] py-4 '>My Profile</h1>
      <div className="section relative p-[24px] bg-richblack-800 rounded-md">
        <div className='flex items-center gap-6'>


          {
            user && <div className='img'>
              <img src={user.image} alt="" className='w-[70px] rounded-full' />

            </div>
          }
          {
            user && <div className='name text-white flex flex-col capitalize text-lg '>
              <span>
                {user.firstName + " " + user.lastName}
              </span>
              <span className='text-richblack-300 text-sm lowercase'>
                {user.email}
              </span>
            </div>
          }
        </div>
        <Link className="btn" to={"/dashboard/settings"}>
          <EditBtn></EditBtn>
        </Link>
      </div>

      <div className="section relative p-[24px] min-h-[160px]  bg-richblack-800 rounded-md">
        <h3 className='font-semibold text-lg'>About / Bio:</h3>

        <div className="about py-8 mt-2 capitalize  text-richblack-300 ">
          {/* {console.log(user.additionalDetails)} */}
         {user.additionalDetails.about?user.additionalDetails.about:"About section for the student"}
        </div>
        <Link className="btn" to={"/dashboard/settings"}>
          <EditBtn></EditBtn>
        </Link>
      </div>
      {/* section -3*/}
      <div className="section relative p-[24px] bg-richblack-800 rounded-md">
        <h3>Personal Details </h3>
        <div className='flex items-center  justify-center gap-6 mt-8'>
          <div className='flex lg:flex-col w-[50%]  p-4  '>
            <span className='text-richblack-200 text-sm py-3 '>FirstName :</span>
            <span className='capitalize'>{user.firstName} </span>
          </div>
          <div className='flex lg:flex-col w-[50%]  p-4'>
            <span className='text-richblack-200 text-sm py-3 '>LastName :</span>
            <span className='capitalize'>{user.lastName} </span>
          </div>
        </div>
        <div className='flex items-center  justify-center gap-6 mt-4'>
          <div className='flex lg:flex-col w-[50%]  p-4  '>
            <span className='text-richblack-200 text-sm py-3 '>Email :</span>
            <span className='capitalize'>{user.email} </span>
          </div>
          <div className='flex lg:flex-col w-[50%]  p-4'>
            <span className='text-richblack-200 text-sm py-3 '>Contact :</span>
            <span className='capitalize'>{user.additionalDetails.contact ? user.additionalDetails.contact: 9888563560} </span>
          </div>
        </div>
        <Link className="btn" to={"/dashboard/settings"}>
          <EditBtn></EditBtn>
        </Link>
      </div>
    </div> :
    <div></div>
    }
    </>
  )
}
