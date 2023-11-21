import React from 'react'
import { FiUpload } from "react-icons/fi"
import { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
export default function Upload({
    name,
    label,
    register,
    setValue,
    errors,
}){
const { token } = useSelector((state) => state.auth)
    useEffect(() => {
        register("courseImage", {required: true })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)
    const fileInputRef = useRef(null)
    const handleClick = () => {
        fileInputRef.current.click()
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        // console.log(file)
        if (file) {
            setImageFile(file)
            previewFile(file)
            setValue("courseImage", file)
        }
    }

        return (
            <div>
                 <img className=' w-[500px] mb-12   h-[300px] object-contain' src={previewSource?previewSource:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK27EIJQ6a2ifdjuHT87gk4325iYI6O6RdrQ&usqp=CAU"} alt="thumbnail" />
                 <input type="file" hidden   name="file" id="file" accept="image/png, image/gif, image/jpeg"   ref={fileInputRef}  onChange={handleFileChange}/>
                <label htmlFor='file' className='btn  block form-style text-center w-[500px]  bg-yellow-50  mt-8 cursor-pointer text-black' >
                  {
                    previewSource ?"Change Thumbnail":"Choose Thumbnail"
                  }
                </label>
            </div>
        )
    }
