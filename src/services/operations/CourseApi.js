import { toast } from 'react-hot-toast'

// slices to update the states in redux store
// import {setLoading,setToken} from '../../slices/authSlice'
// import {resetCart} from '../../slices/cartSlice'
// import {setUser} from '../../slices/profileSlice'
// import useDispatch from 'react-redux'

// api connector to make a backend call 
import { apiConnector } from "../apiconnector"
import { courseEndpoints } from '../apis'
// import { setCourse } from '../../slices/courseSlice.js'

const {CREATE_SECTION_API,CREATE_COURSE_API,EDIT_COURSE_API,CREATE_SUBSECTION_API,DELETE_SECTION_API, DELETE_SUBSECTION_API,UPDATE_COURSE_STATUS_API, GET_ALL_COURSE_API,COURSE_DETAILS_API,CREATE_RATING_API,LECTURE_COMPLETION_API,ASK_AN_ENQUIRY_API,RESPOND_AN_ENQUIRY_API,ALL_ENQUIRY_BY_STUDENT,ALL_ENQUIRY_FOR_INSTRUTOR} =courseEndpoints;

// add the course details
export const addCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CREATE_COURSE_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE COURSE API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Add Course Details")
      }
      toast.success("Course Details Added Successfully")
      console.log("the response from the ssss", response.data)
      result = response?.data?.data
    } catch (error) {
      console.log("CREATE COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }


  // update CourseDetails 
  export const editCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", EDIT_COURSE_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      console.log("EDIT COURSE API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update Course Details")
      }
      toast.success("Course Details Updated Successfully")
      result = response?.data?.data
    } catch (error) {
      console.log("EDIT COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }


// creating a Section
export const createSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }
    toast.success("Course Section Created")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result;
}

  // creating a Subsection 
  export const createSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Add Lecture")
      }
      toast.success("Lecture Added")
      result = response?.data?.data
    } catch (error) {
      console.log("CREATE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

  // deleting a section 

export const deleteSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }
    toast.success("Course Section Deleted")
    result = response?.data?.data
    console.log("the essddff", result) ;
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
export const deleteSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SubSECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }
    toast.success("Course SUBSection Deleted")
    result = response?.data?.data
    console.log("the essddff", result) ;
  } catch (error) {
    console.log("DELETE SUBSECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const makeItPublic = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST",UPDATE_COURSE_STATUS_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("EDIT COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details")
    }
    toast.success("Course Updated Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const getCoursesOfUser = async (token) => {
  let result = null;
  const toastId = toast.loading("Loading...")
  try {

    console.log("the token going", token);
    const response = await apiConnector("GET",GET_ALL_COURSE_API,{token},{
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })

    console.log("herr is sthe gcb9dgofvrgvofv4ve", response)
    
    console.log("ALL COURSE API RESPONSE............", response)
    // if (!response?.data?.success) {
    //   throw new Error("Could Not FEtch Course Details")
    // }
    toast.success("Course Fetched Successfully")
    result = response?.data?.data


  } catch (error) {
    console.log("GET COURSEs API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


export const getCourseDetialsApiCall = async (courseId) => {
  let result = null;

  const toastId = toast.loading("Loading...")
  try {

    const response = await apiConnector("POST",COURSE_DETAILS_API,{courseId}); 
  
    console.log(" COURSE  Details API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not FEtch Course Details")
    }
    toast.success("Course Details Fetched Successfully")
    result = response?.data?.data; 
    console.log("Final Result", result);

  } catch (error) {
    console.log("GET COURSEs API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


// create a rating for course
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE RATING API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return success
}

export const markLectureAsComplete = async (data, token) => {
  let result = null
  console.log("mark complete data", data)
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log(
      "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      response
    )

    if (!response.data.message) {
      throw new Error(response.data.error)
    }
    toast.success("Lecture Completed")
    result = true
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error.message)
    result = false
  }
  toast.dismiss(toastId)
  return result
}

export const askAnEnquiry = async (data, token) => {
  let result = null
  
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", ASK_AN_ENQUIRY_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log(
      "ASK AN ENQUIRY API RESPONSE............",
      response
    )

    if (!response.data.message) {
      throw new Error(response.data.error)
    }
    toast.success("Query Posted...")
    result = response.data.data
  } catch (error) {
    console.log("ask query  API ERROR............", error)
    toast.error(error.message)
    result = false
  }
  toast.dismiss(toastId)
  return result
}

export const respondAnEnquiry = async (data, token) => {
  console.log("the data",data)
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST",RESPOND_AN_ENQUIRY_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log(
      "RESPOND AN ENQUIRY API RESPONSE............",
      response
    )

    if (!response.data.message) {
      throw new Error(response.data.error)
    }
    toast.success("Query Resolved...")
    result = response.data.data
  } catch (error) {
    console.log("resolve Query API ERROR............", error)
    toast.error(error.message)
    result = false
  }
  toast.dismiss(toastId)
  return result
}


export const queriesAskedByMe = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("GET",ALL_ENQUIRY_BY_STUDENT, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log(
      "ASKED ENQUIRIES API RESPONSE............",
      response
    )

    if (!response.data.message) {
      throw new Error(response.data.error)
    }
    toast.success("Queries Fetched...")
    result = response.data.data
  } catch (error) {
    console.log("asked  Query API ERROR............", error)
    toast.error(error.message)
    result = false
  }
  toast.dismiss(toastId)
  return result
}


export const queriesAskedToMe = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("GET",ALL_ENQUIRY_FOR_INSTRUTOR, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log(
      "INstrurcor Enquires API RESPONSE............",
      response
    )

    if (!response.data.message) {
      throw new Error(response.data.error)
    }
    toast.success("Queries Fetched...")
    result = response.data.data
  } catch (error) {
    console.log("INstrutoor Enquires API ERROR............", error)
    toast.error(error.message)
    result = false
  }
  toast.dismiss(toastId)
  return result
}


