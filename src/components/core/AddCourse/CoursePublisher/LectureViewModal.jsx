import React from 'react'

export default function LectureViewModal(props) {
    const {title,link , heading ,btnHandler, description}= props.lectureInfo
  return (
    props.lectureInfo && <div className='text-white rounded-lg bg-richblack-700 p-6 px-8 fixed inset-0 z-[1000] border !mt-0 flex  justify-center items-center bg-opacity-5 backdrop-blur-sm'>
    <div className='w-[80vw] lg:w-[70%] mx-auto  flex flex-col rounded-lg border border-richblack-400 bg-richblack-800 p-6' >
        <div className='bold capitalize text-bold mx-auto mb-12 w-full text-center text-[20px] text-4xl font-bold text-richblack-25'>{heading}</div>
        <div className="description">
        {title}
        </div>
        <div className="description">
        {description}
        </div>
        <div className="video">
        {link}
        </div>
        <div className=' flex justify-end px-5 gap-5'>
            <button type="button" outline="true" className=' mt-9 w-[27%] text-center capitalize text-[13px] px-6 py-3  font-bold rounded-lg text-white border' onClick={btnHandler} >Cancel</button>
        </div> 
    </div>
</div>
  )
}
