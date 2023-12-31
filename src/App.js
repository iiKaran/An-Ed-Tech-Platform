import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/core/common/Navbar";
import Signup from "./Pages/SignUp";
import Login from "./Pages/Login";
import OpenRoute from "./components/core/auth/OpenRoute";
import VerifyEmail from "./Pages/VerifyEmail";
import ForgotPassword from "./Pages/ForgetPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import About from "./Pages/AboutUs";
import ContactUsForm from "./Pages/ContactUs";
import CloseRoute from "./Pages/CloseRoute";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import MyCourse from "./Pages/MyCourse";
// import DashBoard from "./Pages/DashBoard";
import Dashboard from "./Pages/Dashboard";
import Settings from "./Pages/Settings";
import Myprofile from "./Pages/Myprofile";
import EnrolledPage from "./Pages/EnrolledPage";
import CartPage from "./Pages/CartPage";
import AddCourse from "./Pages/AddCourse";
import CourseCatalogPage from "./Pages/CourseCatalogPage";
import CourseDetails from "./Pages/CourseDetails";
import CompleteView from "./Pages/CourseView/CompleteView";
import CourseBar from "./Pages/CourseView/CourseBar";
import MainView from "./Pages/CourseView/MainView";
import QueriesRespond from "./Pages/QueriesRespond";
import QueriesAsked from "./Pages/QueriesAsked";

// log out modal will be the modal placed at center and it will show only if the modalstate has some data
// and this data will be set when we will be clicking the logout button and after if that the confirmation of logout
// will be handeled by the onclick event

function App() {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="/update-password/*"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUsForm />} />
        <Route path="/catalog/:catalogName" element={<CourseCatalogPage />} />
       
        
        <Route path="/view-course/:courseId/section/:sectionId/lecture/:subSectionId" element={<CompleteView />} />
        <Route
          path="/dashboard"
          element={
            <div className="text-white text-center font-bold  capitalize mt-[10%]">
              error page
            </div>
          }
        ></Route>

<Route path="/courses/:courseId" element={
<CloseRoute>
  {
    
   <CourseDetails /> 
  }
</CloseRoute>} />
        <Route
          element={
            <CloseRoute>
              {
              <Dashboard />
          }
            </CloseRoute>
          }
        >
          <Route path ="/dashboard/asked-enquiries" element={<QueriesAsked></QueriesAsked>}></Route>
          <Route path ="dashboard/solve-enquiry" element={<QueriesRespond></QueriesRespond>}></Route>
          <Route path="dashboard/my-profile" element={<Myprofile />} />
          <Route path="dashboard/Settings" element={<Settings />} />
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="/dashboard/enrolled-courses"
                element={<EnrolledPage />}
              />
              <Route
                path="/dashboard/purchase-history"
                element={<div>purchase-history</div>}
              />
              <Route path="/dashboard/cart" element={<CartPage></CartPage>} />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route
                path="/dashboard/my-courses"
                element={<MyCourse></MyCourse>}
              />
              <Route path="/dashboard/add-course" element={<AddCourse />} />
            </>
          )}
        </Route>
        <Route
          path="*"
          element={<div className="border text-white">404 page not found</div>}
        />
      </Routes>
    </div>
  );
}

export default App;
