import React from 'react'

export default function HighLightText(props) {
  return (
    <span className='text-[3vw] brightness-130 text-[#87CEEB]'>
      {props.text}
    </span>
  )
}
