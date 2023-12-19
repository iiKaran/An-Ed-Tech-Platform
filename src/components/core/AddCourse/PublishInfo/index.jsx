import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CiEdit } from "react-icons/ci";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setCourse } from '../../../../slices/courseSlice.js';
import { makeItPublic } from '../../../../services/operations/CourseApi';
export default function PublishInfo() {
  const { course } = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  async function UpdateHandler()
  { 
    try{

        const response = makeItPublic({course_id:course._id},token);   
    }
    catch(err)
    {
      toast.error("Failed to update staus");
      console.log(err)
      return ; 
    }
  }

  
  return (
    <div className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
      <h3 className='text-2xl text-center font-semibold text-richblack-5'>Update Course Status</h3>

      {console.log("the course is ", course.courseName)}
      {

        course && <div className='flex flex-col'> 
        <div className='flex px-3  py-5 justify-start items-center gap-8'>
          <div className='w-[120px]  '>
            <img src={course.thumbnail} alt="loading" loading='lazy' className='w-[100%] rounded-lg' />
          </div>
          <div className=' flex flex-col'>
            <div className='font-bold text-richblack-25'>Course Name</div>
            <div className='capitalize my-1 opacity-70'>{course.courseName}</div>
          </div>
          <div className=' flex flex-col'>
            <div className='font-bold text-richblack-25'>Course Description</div>
            <div className='capitalize my-1 opacity-70'>{course.courseDescription}</div>
          </div>
             <div className='w-[120px]  justify-center flex gap-2 items-center text-center capitalize  px-4 py-2  rounded-lg  bg-yellow-50 text-black'>
            <span className=' text-[19px]'>
            Edit 
            </span>
            <span>
              <CiEdit size={"19px"} />
              </span>
             </div>
        </div>
          <div className='flex  gap-2  justify-end px-3'>
            <button className='flex items-center  justify-center border border-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-2 font-semibold text-yellow-50 w-[180px] text-center' onClick={UpdateHandler}>
              Make It Public
            </button>
            <Link className='flex items-center  justify-center border border-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-yellow-50 w-[180px] text-center' to="/dashboard/my-courses" onClick={()=>{
              toast.success("Saved")
             }}>
              Keep It Private
            </Link>
          </div>
        </div>
      }
      {
        !course && <div className='flex border'>
          No course Found
        </div>
      }


    </div>
  )
}
