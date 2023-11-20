import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from "react-hot-toast"
import {HiOutlineCurrencyRupee} from 'react-icons/hi'
import { categories } from '../../../../services/apis';
import { apiConnector } from '../../../../services/apiconnector';
import { useDispatch, useSelector } from "react-redux"
import { setCourse } from '../../../../slices/courseSlice';
import ChipsInput from './ChipsInput';
import Upload from './Upload';
import { setEditCourse } from '../../../../slices/courseSlice';
export default function CourseBuilder() {
  const [catalog, setCatalog] = useState(null);
  const { course, editCourse } = useSelector((state) => state.course)
  const { register, setValue, getValues, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getCategories() {
      setLoading(true);
      const toastId = toast.loading("loading....")
      const { CATEGORIES_API } = categories;
      const response = await apiConnector("GET", CATEGORIES_API);
      setCatalog(response.data.data);
      console.log("----------------------------------------------------")
      console.log("the response from course build", response.data.data)

      setLoading(false)
      toast.dismiss(toastId);

    }
    if (editCourse) {
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }
    getCategories();
  }, [])
  function onSubmit() {
    console.log("submitted")
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8  rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
       {/* course name */}
      <div className="flex flex-col space-y-4 ">
        <label className="text-sm label-style text-richblack-5" htmlFor="courseTitle">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="form-style w-full"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course title is required
          </span>
        )}
      </div>
      {/* course description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Description is required
          </span>
        )}
      </div>
      {/* course price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>
      {/* category using the dropdown  */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="form-style w-full px-4 capitalize"
        >
          <option value="" disabled>
            Choose Category
          </option>
          {!loading &&
              catalog?.map((category, indx) => (
              <option key={indx} value={category?._id} >
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div>
      {/* {chip input} */}
      <ChipsInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
 <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
    </form>
  )
}
