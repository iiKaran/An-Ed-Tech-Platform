import React from 'react'
import HighLightText from './HighLightText'
import Button from './Button'
import { TypeAnimation } from 'react-type-animation'
export default function CodeBlock({ heading, subheading, reverse, para, ctabtn1, ctabtn2, code }) {
    return (
        <div className={`w-[100%] p-6 flex flex-wrap ${reverse ? "flex-row-reverse" : "flex-row"}  items-start`}>
            {/* section-1 */}

            <div className='text-section w-[100%]  lg:w-[50%]  p-4 '>
                <h3 className='text-[3vw]  capitalize text-center'>
                    {heading}  <HighLightText text={subheading} />
                </h3>
                <p className=' text-sm p-4 leading-7 text-richblack-200 lg:w-[90%]  mx-auto'>
                    {para}
                </p>
                <div className='flex justify-center gap-4 mt-12 mb-4'>
                    <Button children={ctabtn1.children} linkto={ctabtn1.linkto} active={ctabtn1.active} />
                    <Button children={ctabtn2.children} linkto={ctabtn2.linkto} active={ctabtn2.active} />
                </div>
            </div>
            {/* section-2 */}

            <div className='w-[100%] lg:w-[40%] flex items-start p-8 bg-richblack-800'>
                <div className='flex flex-col  bg-richblack-800 w-[10%]'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>
                <div className='w-[80%]  bg-richblack-800 text-yellow-25 text-[11px] '>
                    {/* // animation */}
                    <TypeAnimation
                        sequence={[code, 2000, ""]}
                        style={{
                            whiteSpace: 'pre', 
                            display:"block"
                        }}
                        cursor={true}
                        repeat={Infinity}
                        ref={null}
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>

        </div>
    )
}
