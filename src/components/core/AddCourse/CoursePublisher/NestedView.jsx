import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md"
import { RxDropdownMenu } from "react-icons/rx"
import { RiDeleteBin6Line } from "react-icons/ri"
import { setCourse } from '../../../../slices/courseSlice.js'
import { deleteSection, deleteSubSection } from '../../../../services/operations/CourseApi';
import ConfirmationModal from '../../common/ConfirmationModal'
import AddLectureModal from './AddLectureModal'
// import LectureViewModal from './LectureViewModal';
export default function NestedView() {
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    console.log("the course is", course)
    async function SubSectiondeleteHandler(subsection_id) {
        const result = await deleteSubSection({
            subsection_id,
            course_id: course._id,
            token
        }, token)
        if (result) {
            console.log("after deleting the lecture the result is", result)
            dispatch(setCourse(result));
        }
        setModalData(null)
        return;
    }
    async function SectiondeleteHandler(section_id) {
        const result = await deleteSection({
            section_id,
            courseId: course._id,
            token,
        }, token)
        if (result) {
            console.log("after deleting the result is", result)
            dispatch(setCourse(result));
        }
        setModalData(null)
        return;
    }
    async function SectioncancelHandler() {
        setModalData(null);
        return;
    }
    async function AddLectureHandler(course_id, section_id) {
        console.log("the add lecture ", course_id, section_id)
        setlectureModal({
            course_id: course_id,
            section_id: section_id,
            openStatus: true,
            setOpenStatus: () => { setlectureModal(null) }
        })

    }
    async function deleteLecture() {

    }
    const [modalData, setModalData] = useState(null);
    const [lectureModal, setlectureModal] = useState(null);
    const [viewModal, setviewModal] = useState(null);

    return (
        <>
            <div className="rounded-lg bg-richblack-700 p-6 px-8"
                id="nestedViewContainer">
                {
                    course && course.courseContent.length > 0 &&
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

                                            <button onClick={() => {
                                                setModalData({
                                                    text1: "Delete the section",
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
                                                <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                            </button>
                                            <span className="font-medium text-richblack-300">|</span>
                                            <AiFillCaretDown className={`text-xl text-richblack-300`} />
                                        </div>
                                    </summary>

                                    {/* for every section here comes these subsections */}
                                    <div className="px-6 pb-4">
                                        {/* Render All Sub Sections Within a Section */}
                                        {section?.subSections?.map((data) => (
                                            <div key={data?._id} className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2" >
                                                <div className="flex items-center gap-x-3 py-2 ">
                                                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                                                    <p className="font-semibold text-richblack-50">
                                                        {data.title}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-x-3" >
                                                    {/* <button onClick={setviewModal({
                                                        heading: "Lecture Details",
                                                        title: data.title,
                                                        description: data.description,
                                                        link: data.videoUrl,
                                                        btnHandler: () => {
                                                            setviewModal(null);
                                                            return;
                                                        }
                                                    })} >
                                                        <FaEye className="text-xl text-richblack-300" />
                                                    </button> */}
                                                    <button onClick={() => {
                                                        setModalData({
                                                            text1: "Delete the Lecture",
                                                            text2: "Are you sure you want to delete this  Lecture?",
                                                            btn1Text: "Delete",
                                                            btn1Handler: () => {
                                                                SubSectiondeleteHandler(data._id)
                                                            },
                                                            btn2Text: "Cancel",
                                                            btn2Handler: () => {

                                                                setModalData(null);
                                                                return;

                                                            }
                                                        })
                                                    }}>
                                                        <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        {/* Add New Lecture to Section */}
                                        <button
                                            className="mt-3 flex items-center gap-x-1 text-yellow-50" onClick={() => {
                                                AddLectureHandler(course._id, section._id)
                                            }}>
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

            {
                lectureModal && (<AddLectureModal sectionInfo={lectureModal}></AddLectureModal>)
            }
            {/* {
                viewModal && (<LectureViewModal  lectureInfo={viewModal}></LectureViewModal>)
            } */}
            {modalData ? (
                <ConfirmationModal modalData={modalData} />
            ) : (
                <></>
            )}
        </>
    )
}
