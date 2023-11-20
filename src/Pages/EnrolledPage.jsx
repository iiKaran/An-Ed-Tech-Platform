import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../slices/authSlice'
import { toast } from 'react-hot-toast'
import ProgressBar from "@ramonak/react-progress-bar";
import { apiConnector } from '../services/apiconnector'
import { getEnrolledCourses } from '../services/operations/ProfileApi'
import { profileEndpoints } from '../services/apis'
const { GET_USER_ENROLLED_COURSES_API } = profileEndpoints;



export default function EnrolledPage() {
    const { open } = useSelector((state) => state.modal)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    async function caller() {
        try {
            const toastId = toast.loading("Loading...")
            dispatch(setLoading(true))
            const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, token, {
                // "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            });
            dispatch(setLoading(false))
            toast.dismiss(toastId);
            SetEnrolledCourses(response.data.data)
            return;
        }
        catch (err) {
            console.log("Error IN GETTUNG ENROLLED COURSES .....", err)
            toast.error("Could not get any Enrolled Course")
        }
    }
    useEffect(() => {
        // populate the enrolled courses here
        caller();

    }, []);

    const [enrolledCourses, SetEnrolledCourses] = useState(null);
    return (
        !open && <>
            <div className='px-3'>
                {
                    !enrolledCourses ? (<div className='font-bold text-center  text-[2vmax] py-4 '>
                        No Course Found</div>) : (
                        !enrolledCourses.length ? <div className='font-bold text-center  text-[2vmax] py-4 '>
                            No Course Found
                        </div> : (
                            <>
                                <h1 className='font-bold text-[2vmax] py-4 '>Enrolled Courses</h1>

                                <div className='flex flex-col gap-0  w-[70vw]'>
                                    <div className="col-head   bg-richblack-700   flex item-center justify-between py-3 px-6 text-richblack-50">
                                        <div className="heading">Course Name</div>
                                        <div className="heading">Durations</div>
                                        <div className="heading">Progress</div>
                                    </div>
                                    <div className='all-courses flex flex-col gap-0 text-richblack-300  w-[70vw] ' >
                                        {enrolledCourses.map((course, index) => (
                                            <div className="flex item-center key={index} justify-between py-3 px-8 text-richblack-50">
                                                <div className=" left-part flex gap-2 items-center">
                                                    <div className='thumbnail'>
                                                        <img src={course.thumbnail} alt="course" className='w-[54px] h-[54px] rounded-lg overflow-hidden' />

                                                    </div>
                                                    <div className='flex flex-col gap-1 capitalize'>
                                                        <span className='text-white text-lg'>{course.courseName}</span>
                                                        <span className='text-sm'>{course.courseDescription}</span>
                                                    </div>

                                                </div>
                                                <div className="duration text-richblack-300">
                                                    {`${course.duration ? course.duration : "2hr 30min"}`}
                                                </div>
                                                <div className="heading  flex  flex-col gap-1 items-center justify-center">
                                                    <p > progress {course.completed ? course.completed : "60"}%</p>
                                                    <ProgressBar completed={course.completed ? course.completed : "60"} className=' w-[220px] h-1 ' isLabelVisible={false} bgColor={"#FFE83D"}></ProgressBar>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>)
                    )
                }


                <div>

                </div>
            </div>
        </>
    )

}
