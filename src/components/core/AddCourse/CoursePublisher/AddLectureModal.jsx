import React, { useState } from 'react';
import { useForm } from 'react-hook-form'

import { createSubSection } from '../../../../services/operations/CourseApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../slices/courseSlice.js';
export default function AddLectureModal(props) {
    const dispatch = useDispatch();
    const {token}= useSelector((state)=>state.auth);
    const { openStatus, course_id, section_id, setOpenStatus } = props.sectionInfo;
   async function submitHandler(data,event){
    event.preventDefault() 
    data.course_id= course_id ; 
    data.section_id= section_id;
    console.log("submit", data)
    const response = await  createSubSection(data,token); 
    dispatch(setCourse(response));
    console.log("the result from adding subsection",response); 
    setOpenStatus();
    return ;
    
    }
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
    return (
        props.sectionInfo && <div className='text-white rounded-lg bg-richblack-700 p-6 px-8 fixed inset-0 z-[1000] border !mt-0 flex  justify-center items-center bg-opacity-5 backdrop-blur-sm'>
            <form className='w-[80vw] lg:w-[70%] mx-auto  flex flex-col rounded-lg border border-richblack-400 bg-richblack-800 p-6' onSubmit={handleSubmit(submitHandler)}>
                <div className='bold capitalize text-bold mx-auto mb-12 w-full text-center text-[20px] text-4xl font-bold text-richblack-25'>Add New Lecture</div>
                {/* // here will come input with their label */}
                <label className="w-[80%] mx-auto  ">
            <p className="mb-1 text-[0.975rem]  capitalize leading-[1.375rem] text-richblack-5">
              Lecture Title : <sup className="text-pink-200 font-bold">*</sup>
            </p>
            <input
              type="text"
              className="form-style w-full mt-1"
              placeholder="Enter tile  for lecture"
              name='title'
              {...register("title", {
                required: "Title of lecture is required",
              })}
            />
            {
              errors.title && <p className='text-pink-100 py-2 opacity-70 text-sm capitalize'>{errors.title.message}</p>
            }
          </label>
          <label className='w-[80%]  mx-auto mt-4'>
          <p className="mb-1 text-[0.975rem]  capitalize leading-[1.375rem] text-richblack-5">
              Lecture Description : <sup className="text-pink-200 font-bold">*</sup>
            </p>
            <input className="form-style w-full mt-1" type="text" name="description" {...register("description",{
                required:"check the description"
            })}></input>
            {
                errors.description&& <p className='text-pink-100 py-2 opacity-70 text-sm capitalize'>{errors.description.message}</p>
            }
          </label>
          <label className='w-[80%] mx-auto mt-4'>
          <p className="mb-1 text-[0.975rem]  capitalize leading-[1.375rem] text-richblack-5">
              Link for Video : <sup className="text-pink-200 font-bold">*</sup>
            </p>
            <input className="form-style w-full mt-1" type="text" name="description" {...register("link",{
                required:"Provide the valid video Link"
            })}></input>
            {
                errors.link&& <p className='text-pink-100 py-2 opacity-70 text-sm capitalize'>{errors.link.message}</p>
            }
          </label>

                {/* // buttons will come here  */}
                <div className=' flex justify-end px-5 gap-5'>
                    <button type="button" outline="true" className=' mt-9 w-[27%] text-center capitalize text-[13px] px-6 py-3  font-bold rounded-lg text-white border' onClick={setOpenStatus} >Cancel</button>
                    <button type="submit" className=' mt-9 w-[27%] text-center capitalize text-[13px] px-6 py-3  font-bold rounded-lg bg-yellow-50 text-black' >Save</button>
                </div>
            </form>
        </div>
    )
}
