import React from 'react'
import CourseBar from './CourseBar'
import MainView from './MainView'

export default function CompleteView() {
  return (
    
    <div className='flex section-1 text-white'>
        <div>Course Bar
            <CourseBar></CourseBar>
        </div>
        <div>MainView
            <MainView></MainView>
        </div>
    </div>
  )
}
