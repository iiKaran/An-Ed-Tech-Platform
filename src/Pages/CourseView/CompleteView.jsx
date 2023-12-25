import React,{useEffect} from 'react'
import CourseBar from './CourseBar'
import MainView from './MainView'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCourseSectionData , setEntireCourseData, setCurrentLecureData } from '../../slices/viewCourseSlice';

import { getCourseDetialsApiCall } from '../../services/operations/CourseApi';


export default function CompleteView() {
  const { courseId, sectionId, subSectionId } = useParams();
const dispatch = useDispatch();
const location = useLocation();

useEffect(() => {
  FetchCourseDetails();
}, [location.pathname]);

async function FetchCourseDetails() {
  const result = await getCourseDetialsApiCall(courseId);
  dispatch(setEntireCourseData(result));
  const course = result[0];
  course.courseContent.forEach((element) => {
    if (element._id === sectionId) {
      dispatch(setCourseSectionData(element));
      element?.subSections.forEach(detail => {
        if (detail._id === subSectionId) {
          dispatch(setCurrentLecureData(detail));
        }
      });
    }
  });


}
  return (
    
    <div className='flex section-  gap-2 min-h-[120vh] text-white'>
        <div>
            <CourseBar></CourseBar>
        </div>
        <div>
            <MainView></MainView>
        </div>
    </div>
  )
}
