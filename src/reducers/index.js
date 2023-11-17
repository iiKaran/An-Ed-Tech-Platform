import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice"
import modalReducer from "../slices/modalSlice";
import cartReducer from '../slices/cartSlice'
const rootReducer = combineReducers({
    auth:authReducer, 
    profile:profileReducer, 
    cart:cartReducer, 
    modal:modalReducer
    
})
export default rootReducer;