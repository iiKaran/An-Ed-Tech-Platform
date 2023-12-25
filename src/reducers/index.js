import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice"
import modalReducer from "../slices/modalSlice";
import cartReducer from '../slices/cartSlice'
import courseSlice from "../slices/courseSlice";
import viewCourseSlice from "../slices/viewCourseSlice";
const rootReducer = combineReducers({
    auth:authReducer, 
    profile:profileReducer, 
    cart:cartReducer, 
    modal:modalReducer,
    course:courseSlice, 
    viewCourse:viewCourseSlice,
    
})
export default rootReducer;