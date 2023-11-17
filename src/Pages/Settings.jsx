import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { FiUpload } from "react-icons/fi"
import { updateProfile } from '../services/operations/ProfileApi'
import { updateDisplayPicture } from '../services/operations/ProfileApi'
export default function Settings() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const fileInputRef = useRef(null)
  const handleClick = () => {
    fileInputRef.current.click()
  }
  const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]
  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    dateofbirth: user?.additionalDetails?.dateOfBirth,
    gender: user?.additionalDetails?.gender,
    about: user?.additionalDetails?.about,
    contact: user?.additionalDetails?.contact,
  })
  function changeHandler(e) {
    const { name, value } = e.target;

    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }))
    // console.log("change ", formData)
  }
  function handleSubmit() {
    dispatch(updateProfile(formData.firstName, formData.lastName, formData.contact, formData.about, formData.dateofbirth, formData.gender, token, navigate))
  }
  const { open } = useSelector((state) => state.modal)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)
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
    }
  }
  const handleFileUpload = () => {
    try {
      console.log("uploading...")
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)
      // console.log("formdata", formData)
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false)
      })
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    !open && <>
      <div className='text-white'>
        <div className='text-white  lg:w-[70vw]  px-6 flex flex-col gap-8'>
          <h1 className='font-extrabold text-[2vmax] py-4 '>Settings</h1>
          <div className="section- file-input relative p-[24px] bg-richblack-800 rounded-md">
            {
              user && <div className='img flex   items-center gap-8'>
                <img  src={previewSource || user?.image} alt="" className='w-[70px] rounded-full' />
                <div>
                  <h1 className='mb-4 pt-1 opacity-90 text-sm'>Change Profile Picture</h1>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/png, image/gif, image/jpeg"
                    />
                    <div className=" cursor-pointer text-center capitalize text-[13px] px-4 py-3  w-[120px] font-bold rounded-lg bg-yellow-50 text-black" onClick={handleClick} >
                      Select
                    </div>
                    {!loading && <div className="text-center capitalize text-[13px] flex gap-2 cursor-pointer px-6 py-3  w-[120px]  rounded-lg text-richblack-200 bg-richblack-700" onClick={handleFileUpload}>
                      <FiUpload className="text-lg text-richblack-300" />
                      Upload
                    </div>}
                    {loading && <div className="text-center capitalize text-[13px] flex gap-2 cursor-pointer px-6 py-3  w-[120px]  rounded-lg text-richblack-200 bg-richblack-700">
                      Uploading....
                    </div>}
                  </div>
                </div>
              </div>
            }
          </div>

          <div className="form-save section- p-[24px] bg-richblack-800 rounded-md">
            <div className="head mb-8">
              Profile Information :
            </div>

            <div className="flex  gap-6  mt-2">
              {/* // input seperated by 2 / */}
              <div className="flex flex-col gap-2 lg:w-[48%]">

                <label htmlFor="firstName" className="lable-style">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter first name"
                  className="form-style"
                  defaultValue={formData.firstName}
                  onChange={changeHandler}
                  value={formData.firstName}
                />


              </div>
              <div className="flex flex-col gap-2 lg:w-[48%]">

                <label htmlFor="firstName" className="lable-style">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter last name"
                  className="form-style"
                  defaultValue={formData.lastName}
                  onChange={changeHandler}
                  value={formData.lastName}

                />


              </div>
            </div>
            <div className="flex  gap-6  mt-8 ">
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="dateOfBirth" className="lable-style">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateofBirth"
                  id="dateofBirth"
                  className="form-style"

                  value={formData.dateofbirth}
                  onChange={changeHandler}
                />
              </div>
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="gender" className="lable-style">
                  Gender
                </label>
                <select
                  type="text"
                  name="gender"
                  id="gender"
                  className="form-style"
                  onChange={changeHandler}
                  value={formData.gender}
                >
                  {genders.map((ele, i) => {
                    return (
                      <option key={i} value={ele}>
                        {ele}
                      </option>
                    )
                  })}
                </select>

              </div>
            </div>
            <div className="flex  gap-6  mt-8 ">
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="contactNumber" className="lable-style">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contact"
                  id="contactNumber"
                  placeholder="Enter Contact Number"
                  className="form-style"
                  minLength={10}
                  maxLength={12}
                  onChange={changeHandler}
                  value={formData.contact}
                />

              </div>
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="about" className="lable-style">
                  About
                </label>
                <input
                  type="text"
                  name="about"
                  id="about"
                  placeholder="Enter Bio Details"
                  className="form-style"
                  value={formData.about}
                  onChange={changeHandler}
                />
              </div>
            </div>
          </div>

          <div className="deleteAccount">
            {/* I will be implementing this features as the account will get deleted after the 30 days of the deletion request if not needed */}
          </div>
          <div className="flex justify-end gap-2">
            <div
              onClick={() => {
                navigate("/dashboard/my-profile")
              }}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >
              Cancel
            </div>
            <div className='cursor-pointer rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-800' onClick={handleSubmit}>
              Save
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
