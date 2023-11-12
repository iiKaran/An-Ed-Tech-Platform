import React from 'react'
import HighLightText from '../HomePage/HighLightText'

const Quote = () => {
  return (
    <div className='w-[70vw] p-16 px-4 mx-auto text-[1.73rem] text-center capitalize  leading-14'>
    " We are passionate about revolutionizing the way we learn. Our innovative platform 
      <span className='text-blue-100 capitalize'>
       {" "} combines technology 
      </span>
      <span className='text-yellow-5'>
        {" "}
        expertise
      </span>
      , and community to create an 
      <span  className='text-yellow-5'>
      {" "}
        unparalleled educational experience. "
      </span>
    </div>
  )
}

export default Quote
