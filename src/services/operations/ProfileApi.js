import { toast } from 'react-hot-toast'
import { setLoading, setToken } from '../../slices/authSlice'
import { setUser } from '../../slices/profileSlice'
import useDispatch from 'react-redux'
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"
import { profileEndpoints } from '../apis'
const { UPDATE_PROFILE_API, UPDATE_DISPLAY_PICTURE_API } = settingsEndpoints;
const { GET_USER_ENROLLED_COURSES_API } = profileEndpoints;
export function updateProfile(firstName, lastName, contact, about, dateofbirth, gender, token, navigate) {
  return async (dispatch) => {
    console.log("sending the token ", token)
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {


      console.log("comng token", token); 
    const response = await apiConnector("POST", UPDATE_PROFILE_API, {
        firstName,
        lastName,
        contact,
        about,
        dateofbirth,
        gender,
        token
      })

      console.log("update profile API RESPONSE............//////")
      console.log(response.data.data)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Updated")
      localStorage.setItem("user", JSON.stringify(response.data.data))
      dispatch(setUser(response.data.data))

    } catch (error) {
      console.log("update profile API ERROR............", error)
      toast.error("Could Not Update the profile")
    }

    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}
export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,

        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      console.log("PP UPDATED", response.data)
      dispatch(setUser(response.data.data))
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId)
  }
}
export function getEnrolledCourses(token) {
  return async (dispatch) => {
    try {
      console.log("token from the course", token)
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, token, {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      });
      console.log("response from tjhe enroled courses",response.data.data);
      dispatch(setLoading(false))
      toast.dismiss(toastId);
      return;
    }
    catch (err) {
      console.log("Error IN GETTUNG ENROLLED COURSES .....", err)
      toast.error("Could not get any Enrolled Course")
    }
  }
}