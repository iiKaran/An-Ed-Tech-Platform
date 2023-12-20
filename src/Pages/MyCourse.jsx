import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { CiEdit } from "react-icons/ci";
import { getCoursesOfUser } from '../services/operations/CourseApi';
const data = [
    {
        courseName: 'Course Name',
        courseDescription: 'Here is the Description of the Course',
        thumbnail: 'https://api.dicebear.com/5.x/initials/svg?seed=girish singla',
        status: 'draft'
    },
    {
        courseName: 'Course Name',
        courseDescription: 'Here is the Description of the Course',
        thumbnail: 'https://api.dicebear.com/5.x/initials/svg?seed=girish singla',
        status: 'draft'
    },
    {
        courseName: 'Course Name',
        courseDescription: 'Here is the Description of the Course',
        thumbnail: 'https://api.dicebear.com/5.x/initials/svg?seed=girish singla',
        status: 'draft'
    },
    {
        courseName: 'Course Name',
        courseDescription: 'Here is the Description of the Course',
        thumbnail: 'https://api.dicebear.com/5.x/initials/svg?seed=girish singla',
        status: 'draft'
    },
    {
        courseName: 'Course Name',
        courseDescription: 'Here is the Description of the Course',
        thumbnail: 'https://api.dicebear.com/5.x/initials/svg?seed=girish singla',
        status: 'Public'
    }
]
export default function MyCourse() {
    const [courses, setCourses] = useState(null);
    const {token} = useSelector((state) => state.auth)
    async function fetchCourses() {
        const result = await getCoursesOfUser(token);
        setCourses(result);
    }
    useEffect(() => {
          fetchCourses();
    },[])
    return (
        <div className='flex w-[80vw] flex-col items-start gap-x-6 '>
            <h1 className="mb-3  w-full  text-center  px-4  pt-12  mt-9  text-3xl font-medium text-richblack-5">
                My Courses
            </h1>
           {courses&& 
          <table className='flex w-[80vw] flex-col items-start justify-items-start  gap-x-6'>
          
          <thead className='border flex items-center justify-around gap-4 mb-6 mt-4 rounded-md font-bold py-3 w-full'>
            <tr className='flex items-center justify-around gap-4 mb-6 mt-4 rounded-md font-bold py-3 w-full'>
              <th >
                Thumbnail
              </th>
              <th >
                Course Name
              </th>
              <th >
                Course Description
              </th>
              <th >
                <span className='text-[19px]'>
                  Course Status
                </span>
              </th>
            </tr>
          </thead>
        <tbody className=' w-full flex flex-col !items-start !justify-start'>

     
          {
            courses.map((subject, index) => {
              return (
                <tr key={index} className='flex items-center justify-around gap-4 w-full'>
                  <td>
                    <img src={subject.thumbnail} alt="" className="w-[100px] h-[80px] rounded-lg object-cover" />
                  </td>
                  <td className='text-left'>
                    {subject.courseName}
                  </td>
                  <td className='text-left'>
                    {subject.courseDescription}
                  </td>
        
                  {
                    subject.status === "Draft" ?
                      <td className='w-[120px] justify-center flex gap-2 items-center text-center capitalize px-4 py-2 rounded-lg bg-yellow-50 text-black'>
                        <span className='text-[19px]'>
                          Edit
                        </span>
                        <span>
                          {/* Assuming CiEdit is an icon component */}
                          <CiEdit size={"19px"} />
                        </span>
                      </td> :
                      <td className='w-[120px] justify-center flex gap-2 items-center text-center capitalize px-4 py-2 rounded-lg bg-richblack-25 text-black'>
                        <span className='text-[19px]'>
                          Published
                        </span>
                      </td>
                  }
                </tr>
              )
            })
          }
             </tbody>
        </table>
        }
            {!courses &&
                <div className="flex  flex-col w-[100%] h-[100%]  items-center justify-center">

                    <img className="rounded-md" src="data:image/jpeg;base64,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" alt="" />
                    <span className='text-2xl py-5 font-bold capitalize'>
                        No Course Found
                    </span>
                </div>}

        </div>
    )
}
