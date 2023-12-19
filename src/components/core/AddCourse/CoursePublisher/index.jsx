import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { IoAddCircleOutline } from "react-icons/io5"
import { createSection } from '../../../../services/operations/CourseApi'
import { setCourse, setStep } from '../../../../slices/courseSlice.js'
import toast from 'react-hot-toast'
import NestedView from './NestedView'
export default function CoursePublisher() {
  const [editSection, setEditSection] = useState(false)
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const { register, setValue, handleSubmit, formState: { errors } } = useForm();
  async function onSubmit(data) {
    // post the section to the course id 
    const result = await createSection({
      sectionName: data.sectionName,
      courseId: course._id
    }, token)
    console.log(data, token, course._id, "thedsa")
    dispatch(setCourse(result));
    localStorage.setItem('course', JSON.stringify(result))
    setValue("sectionName", "");
  }
  return (
    <div className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
      <h3 className='text-2xl font-semibold text-richblack-5'>Course Publisher</h3>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className='flex flex-col space-y-4'>
          <label htmlFor="sectionName" className='label-style text-sm text-richblack-5'>Section Name <sup className='text-pink-200'>*</sup></label>
          <input type="text" placeholder='Enter the Section name' id="sectionName" className='form-style capitalize w-[full] border' {...register("sectionName", {
            required: true,
          })} />
          {
            errors.sectionName && <p className='text-pink-100 py-2 opacity-70 text-sm capitalize'>Section Name is Required</p>
          }
          <div className='flex justify-start items-end gap-3'>
            <button type="submit" className="flex items-center  justify-center border border-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-yellow-50 w-[28vh] text-center">
              <div >
                {
                  !editSection ? <div className='flex items-center gap-2 py-2'> Create Section  <IoAddCircleOutline size={20} className="text-yellow-50" /> </div> : "Edit Section"
                }
              </div>
            </button>
            {
              editSection && <button className="text-sm text-richblack-300 underline">Cancel Edit</button>
            }
          </div>
        </div>

      </form>
      <div>
        {/* // nested view to populate the section and the subsections  */}
        <NestedView />
      </div>
      <div className=' flex justify-end px-5 gap-5'>
        <button type="button" outline="true" className=' mt-9 w-[27%] text-center capitalize text-[13px] px-6 py-3  font-bold rounded-lg text-white border' > Cancel</button>
        <button type="button" className=' mt-9 w-[27%] text-center capitalize text-[13px] px-6 py-3  font-bold rounded-lg bg-yellow-50 text-black' onClick={() => {
          let flag = true;
          if (course.courseContent.length <= 0) {
            toast.error("Add Atleast One Section")
            return;
          }
          course.courseContent.forEach(element => {

            if (element.subSections?.length <= 0) {
              toast.error("Each Section Should have Atleast one lecture");
              flag = false;
              return;
            }
          });
          if (flag) {
            toast.success("Course Updated");
            dispatch(setStep(3));
          }
          return;


        }} > Next</button>
      </div>
    </div>
  )
}
