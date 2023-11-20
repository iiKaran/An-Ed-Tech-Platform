import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from "react-icons/fa"
import CoursePublisher from './CoursePublisher/index.jsx'
import CourseBuilder from './CourseBuilder/index.jsx'
import PublishInfo from './PublishInfo/index.jsx'
export default function RenderSteps() {
    const {step}= useSelector((state)=>state.course)
   
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ]
  return (
    <>
    <div className=''>
    <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item) => (
          <>
            <div
              className="flex flex-col items-center "
              key={item.id}
            >
                <div className='flex flex-col items-center'>
              <button
                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                  step === item.id
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
              >

                {step > item.id ? (
                  <FaCheck className="font-bold text-richblack-900" />
                ) : (
                  item.id
                )}
              </button>
              <div className='mt-2 capitalize'>
                {/* {item.title} */}
              </div>
              </div>
            </div>
            {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2  ${
                  step > item.id  ? "border-yellow-50" : "border-richblack-500"
                } `}
                ></div>
              </>
            )}
          </>
        ))}
      </div>
    </div>
    {step==1 &&<CourseBuilder/> }
    {step==2 &&<CoursePublisher/>}
    {step==3 &&<PublishInfo/> }
    </>
  )
}
