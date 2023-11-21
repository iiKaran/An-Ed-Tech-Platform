import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import ChipsInput from './ChipsInput'
import RequirementField from './RequirementField';
import Upload from './Upload';
import {toast} from 'react-hot-toast'
import { useState } from 'react';
import { apiConnector } from '../../../.././services/apiconnector'
import { courseEndpoints } from '../../../.././services/apis'
import { setStep,setCourse} from '../../../../slices/courseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails,editCourseDetails} from '../../../../services/operations/CourseApi';
export default function Index() {
  const dispatch = useDispatch();
  const { COURSE_CATEGORIES_API } = courseEndpoints;
  const [loading, setLoading] = useState(false);
  const [catalog, setCatalog] = useState(null);
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
  const { editCourse, course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)

  async function getCat() {
    setLoading(true);
    const response = await apiConnector("GET", COURSE_CATEGORIES_API);
    setCatalog(response.data.data);
    setLoading(false);
  }
  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.name !== course.courseName ||
      currentValues.description !== course.courseDescription ||
      currentValues.price !== course.price ||
      currentValues.tags.toString() !== course.tag.toString() ||
      currentValues.benifits !== course.whatYouWillLearn ||
      currentValues.category !== course.category._id ||
      currentValues.courseRequirements.toString() !==
      course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true
    }
    return false
  }

  useEffect(() => {
    if (editCourse) {
      // console.log("data populated", editCourse)
      setValue("name", course.courseName)
      setValue("description", course.courseDescription)
      setValue("price", course.price)
      setValue("tag", course.tag)
      setValue("benifits", course.whatYouWillLearn)
      setValue("category", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }

    getCat();
  }, []);


  async function onSubmit(data, event) {
    console.log("inside")
    console.log(data)
    const currentValues = getValues()
    if (editCourse) {
      // check for the changes 
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()

        //  update then course 
        formData.append("courseName", data.name);
        formData.append("courseDescription", data.description);
        formData.append("category", data.category);
        formData.append("price", data.price);
        formData.append("tag", data.tags);
        formData.append("instructions", data.courseRequirements);
        formData.append("thumbnail", data.courseImage);
        formData.append("whatYouWillLearn",data.benifits);
        setLoading(true)
        const result = await editCourseDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          localStorage.setItem('step',JSON.stringify(2))
          dispatch(setCourse(result))
          localStorage.setItem('course',JSON.stringify(result))
          console.log("the course has been setled as ",course)
        }
        
      }
      else {
        // toast that there are no changes in the form 
 toast.error("No changes made to the form")

      }
    }
    else {
      // create new course
      const formData = new FormData();
      formData.append("courseName", data.name);
      formData.append("courseDescription", data.description);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("tag", data.tags);
      formData.append("instructions", data.courseRequirements);
      formData.append("thumbnail", data.courseImage);
      formData.append("whatYouWillLearn ", data.benifits);
      const result = await addCourseDetails(formData, token)
      if (result) {
        console.log("the result", result)
        dispatch(setStep(2))
        localStorage.setItem('step',JSON.stringify(2))
        dispatch(setCourse(result))
        localStorage.setItem('course',JSON.stringify(result))
        console.log("the course has been setled as ",course)
      }
      setLoading(false)
    }
  }

  return (
    <div >

      <form className='flex flex-col   px-5 gap-4' onSubmit={handleSubmit(onSubmit)}>
        {/* course Name */}
        <div className="flex flex-col gap-1 ">
          <label className="w-[100%]  ">
            <p className="mb-1 text-[0.975rem] leading-[1.375rem] text-richblack-5">
              Course Title <sup className="text-pink-200 font-bold">*</sup>
            </p>
            <input
              type="text"
              className="form-style w-full mt-1"
              placeholder="Enter Course Name"
              id='courseName'
              name='courseName'
              {...register("name", {
                required: "Title is required",
              })}
            />
            {
              errors.name && <p className='text-pink-100 py-2 opacity-70 text-sm capitalize'>{errors.name.message}</p>
            }
          </label>
        </div>

        {/* course description */}
        <div className="flex flex-col gap-1 ">
          <label className="w-[100%]  ">
            <p className="mb-1 text-[0.975rem] leading-[1.375rem] text-richblack-5">
              Course Description : <sup className="text-pink-200 font-bold">*</sup>
            </p>
            <input
              type="text"
              className="form-style w-full mt-1"
              placeholder="Enter Description for Course"
              name='descripton'
              {...register("description", {
                required: "Course Description is required and must be a string"
              })}
            />
            {
              errors.description && <p className='text-pink-100 py-2 opacity-70 text-sm capitalize'>{errors.description.message}</p>
            }
          </label>
        </div>

        {/* {coursePrice} */}
        <div className="flex flex-col gap-1 ">
          <label className="w-[100%]  ">
            <p className="mb-1 text-[0.975rem] leading-[1.375rem] text-richblack-5">
              Course Price : <sup className="text-pink-200 font-bold">*</sup>
            </p>
            <input
              type="text"
              className="form-style w-full mt-1"
              placeholder="Enter Price for Course In rupees"
              name='course price'
              {...register("price", {
                required: "Course Price is required and must be a number",
                pattern: "/^\d+$/"
              })}
            />
            {
              errors.price && <p className='text-pink-100 py-2 opacity-70 text-sm capitalize'>{errors.price.message}</p>
            }
          </label>
        </div>
        {/* {choose Category} */}
        <div className="flex flex-col gap-1 ">
          <label className="w-[100%]  ">
            <p className="mb-1 text-[0.975rem] leading-[1.375rem] text-richblack-5">
              Choose Category  <sup className="text-pink-200 font-bold">*</sup>
            </p>
            <select
              type="text"
              className="form-style w-full mt-1"
              placeholder="choose Price for Course In rupees"
              name='course category'
              {...register("category")}
            >
              {
                catalog?.map((category, index) => (
                  <option key={index} value={category?._id}>
                    {category?.name}
                  </option>
                ))
              }

            </select>
            {
              errors.price && <p className='text-pink-100 py-2 opacity-70 text-sm capitalize'>{errors.price.message}</p>
            }
          </label>
        </div>
        {/* // tags chips input */}
        <ChipsInput register={register} errors={errors} name={"tags"} placeholder="Type Comma Seprated Tags" label={"Tags"} setValue={setValue}></ChipsInput>



        {/* // image input */}
        <Upload
          name="courseImage"
          label="Course Thumbnail"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editCourse ? course?.thumbnail : null}
        />
        {/* // benifits */}
        <div className="flex flex-col gap-1  ">
          <label className="w-[100%]  ">
            <p className="mb-1 text-[0.975rem] leading-[1.375rem] text-richblack-5">
              Learning Outcomes : <sup className="text-pink-200 font-bold">*</sup>
            </p>
            <input
              type="text"
              className="form-style w-full mt-1  py-0 h-[120px]"
              placeholder="Enter Benifites or Course Outcomes "
              name='benifits'
              {...register("benifits", {
                required: "Atleast Course benifit  is required and must be a string",
              })}
            />
            {
              errors.benifits && <p className='text-pink-100 py-2 opacity-70 text-sm capitalize'>{errors.benifits.message}</p>
            }
          </label>
        </div>

        {/* // pre requists */}
        <RequirementField
          name="courseRequirements"
          label="Requirements/Instructions"
          register={register}
          setValue={setValue}
          errors={errors}
          getValues={getValues}
        />

        {/* {next btn } */}
        <div className=' flex justify-end px-5'>
          <button type="submit" className=' mt-9 w-[27%] text-center capitalize text-[13px] px-6 py-3  font-bold rounded-lg bg-yellow-50 text-black'> Next</button>
        </div>

      </form>
    </div>
  )
}
