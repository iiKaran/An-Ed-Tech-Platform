import React from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import SideLink from './SideLink'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { CiSettings } from "react-icons/ci";
import { SlLogout } from "react-icons/sl";
import { useState } from 'react'
import { setModal } from '../../../slices/modalSlice'
import { logout } from '../../../services/operations/AuthApi'
export default function SideBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { open } = useSelector((state) => state.modal)
    const { user } = useSelector((state) => state.profile)
   
    console.log("object s", user);
    const ideal = {
        head: "Log Out Confirmation",
        text: "You will get logged out Press okay to confirm?",
        btntext1: "Ok",
        btntext2: "Cancel",
    }
    const logOutHandler = () => {
        setModalData(null);
        console.log("log out click");
        dispatch(setModal(!open));
        dispatch(logout(navigate));
    }
    const [modalData, setModalData] = useState(null)
    return (
        <>
            <div className='flex flex-col  gap-4 py-12  capitalize sticky  h-[100%]'>
                {
                    sidebarLinks.map((element, index) => (

                        (!element.type || user && user.accountType === element.type) ?
                            <span key={index}>
                            <SideLink index={index} path={element.path} icon={element.icon} title={element.name} ></SideLink>
                            </span>
                            :
                            (null)
                    ))
                }

                <Link className='flex  mt-6 py-4   gap-4 px-4 items-center font-medium text-lg text-richblack-200  border-t-2 w-[90%] mx-auto cursor-pointer' to="/dashboard/settings">
                    <span>
                        <CiSettings className="text-lg" />
                    </span>
                    <span>
                        Settings
                    </span>
                </Link>
                <Link className='  flex  py-2 px-4 font-medium text-lg  gap-4 items-center text-richblack-200  w-[90%] mx-auto cursor-pointer' onClick={() => {
                    setModalData(ideal)
                    dispatch(setModal(!open));
                }}>
                    <span>
                        <SlLogout className="text-lg " />
                    </span>
                    <span >
                        LogOut
                    </span>
                </Link>




            </div>
            {modalData && <div className='  h-[100vh]  text-white w-[100vw]   flex items-center justify-center z-[20] fixed top-0 bg-richblack-800'>
                <div className=' p-6 shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] border rounded-md'>
                    <h1 className='font-extrabold text-xl p-12 py-6 text-center capitalize '>{modalData.head}</h1>
                    <p className='text-richblack-300 mb-6'>
                        <h4>{modalData.text}</h4>
                    </p>
                    <div className="buttons flex justify-around">
                        <button className='bg-yellow-50  text-black  p-5 py-2 border-0 w-[30%]' onClick={logOutHandler}>
                            {modalData.btntext1}
                        </button>

                        <button onClick={() => {
                            setModalData(null)
                            dispatch(setModal(!open));
                        }} className='w-[30%]'>
                            {modalData.btntext2}
                        </button>
                    </div>
                </div>
            </div>
            }
        </>

    )
}
