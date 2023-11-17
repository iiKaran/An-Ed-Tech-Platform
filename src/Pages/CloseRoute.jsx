import React from 'react'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'
import { Navigate } from "react-router-dom"
export default function CloseRoute({ children }) {

    const { token } = useSelector((state) => state.auth)
    console.log("inside close rout");
    if (token !== null){
        console.log(token);
        return children
    }
        
    else {
        return <Navigate to="/login" />
    }
}