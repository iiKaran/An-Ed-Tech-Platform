import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {GiNinjaStar} from "react-icons/gi"
import {RiDeleteBin6Line} from "react-icons/ri"
import {removeFromCart} from "../../../slices/cartSlice"
import RatingStars from '../common/RatingStar'

const RenderCartCourses = () => {
   
    const {cart,totalItems} = useSelector((state) => state.cart);
    const dispatch = useDispatch();


  return (
    <div className='flex flex-col gap-8'>
        <div className='text-richblack-400 px-2 capitalize'>Buy all {totalItems} Courses Together to avail Benifits</div>
    {
        cart.map((course, index) => (
            <div className=' text-richblack-400 py-5 border-b-2 flex  w-[70vw] justify-between' key={index}>
                <div className='flex gap-8'>
                    <img src={course?.thumbnail} className='w-[185px] rounded-lg'  alt='loading'/>
                    <div>
                        <p className='font-bold text-xl capitalize text-white mb-4'>{course?.courseName}</p>
                        <p className='flex flex-col'>
                        {/* <span>Name</span> */}
                            <span className=''>
                            {course?.category?.name}
                            </span>
                        </p>
                        <div className='flex gap-2 mb-4'>
                            <span>4.8</span>
                            <RatingStars Review_Count={4.5} />
                            <span>(Ratings)</span>
                        </div>
                        <div>
                        Total Courses • Lesson • Beginner
                        </div>
                    </div>
                </div>

                <div>
                    <button
                    onClick={() => dispatch(removeFromCart(course._id))}
                    className='flex justify-center items-center gap-2 rounded-md text-pink-200 bg-richblack-800 p-3 mb-8'
                    >
                        <RiDeleteBin6Line/>
                        <span>Remove</span>
                    </button>

                    <p className='font-bold text-2xl text-yellow-25'>Rs. {course?.price} </p>
                </div>
            </div>
        ))
    }
      
    </div>
  )
}

export default RenderCartCourses
