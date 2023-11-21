import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RxDropdownMenu } from "react-icons/rx"
import { RiDeleteBin6Line } from "react-icons/ri"
import {setCourse} from '../../../../slices/courseSlice'
import {deleteSection} from '../../../../services/operations/CourseApi';
import  ConfirmationModal from '../../common/ConfirmationModal'
export default function NestedView() {
    const { course } = useSelector((state) => state.course);
    const {token} = useSelector((state)=>state.auth);
    const dispatch= useDispatch();
    console.log("the course is", course)
   async function SectiondeleteHandler(section_id){
    const result = await deleteSection({
        section_id,
        courseId: course._id,
        token,
      })
      if (result) {
        console.log("after deleting the result is", result)
        dispatch(setCourse(result)); 
        localStorage.setItem('course',JSON.stringify(result));
      }
      setModalData(null)
       return ;
   }
   async function SectioncancelHandler(){
    setModalData(null);
    return ;
}
   const [modalData , setModalData] = useState(null);
    return (
        <>
        <div className="rounded-lg bg-richblack-700 p-6 px-8"
            id="nestedViewContainer">
            {
                course && course.courseContent.length &&
                <div className='top-level div'>
                    <div className='sections-container'>
                        {/* contains all the  sections */}
                        {course?.courseContent?.map((section, index) => (
                            <details className='section-name' key={index}>
                                <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                                    <div className="flex items-center gap-x-3">
                                        <p className="font-semibold text-richblack-50">
                                            {section.sectionName}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <button  >
                                            <MdEdit className="text-xl text-richblack-300" />
                                        </button>
                                        <button onClick={()=>{
                                            setModalData({
                                                text1:"Delete the section",
                                                text2: "Are you sure you want to delete this section?",
                                                btn1Text: "Delete",
                                                btn1Handler: () => {
                                                   SectiondeleteHandler(section._id)
                                                },
                                                btn2Text: "Cancel",
                                                btn2Handler: () => {
                                                    SectioncancelHandler()
                                                }
                                            })  
                                        }}>
                                            <RiDeleteBin6Line className="text-xl text-richblack-300"  />
                                        </button>
                                        <span className="font-medium text-richblack-300">|</span>
                                        <AiFillCaretDown className={`text-xl text-richblack-300`} />
                                    </div>
                                </summary>

                                {/* for every section here comes these subsections */}
                                <div className="px-6 pb-4">
                                    {/* Render All Sub Sections Within a Section */}
                                    {section?.subSection?.map((data) => (
                                        <div key={data?._id} className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2" >
                                            <div className="flex items-center gap-x-3 py-2 ">
                                                <RxDropdownMenu className="text-2xl text-richblack-50" />
                                                <p className="font-semibold text-richblack-50">
                                                    {data.title}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-x-3" >
                                                <button>
                                                    <MdEdit className="text-xl text-richblack-300" />
                                                </button>
                                                <button>
                                                    <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                                </button>
                                            </div>
                                            </div>
                                    ))}
                                    {/* Add New Lecture to Section */}
                                    <button
                                        className="mt-3 flex items-center gap-x-1 text-yellow-50">
                                        <FaPlus className="text-lg" />
                                        <p>Add Lecture</p>
                                    </button>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>

            }
        </div>
         {/* Confirmation Modal */}
      {modalData ? (
        <ConfirmationModal modalData={modalData} />
      ) : (
        <></>
      )}
      </>
    )
}
