import "./App.css";
import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home";
import Navbar from "./components/core/common/Navbar"
import Signup from "./Pages/SignUp";
import Login from "./Pages/Login";
import OpenRoute from "./components/core/auth/OpenRoute"
import VerifyEmail from "./Pages/VerifyEmail";
import ForgotPassword from "./Pages/ForgetPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import About from "./Pages/AboutUs";
import ContactUsForm from "./Pages/ContactUs";
import CloseRoute from "./Pages/CloseRoute";
import { ACCOUNT_TYPE } from "./utils/constants"
import { useSelector } from "react-redux";
import DashBoard from "./Pages/DashBoard";
import Settings from "./Pages/Settings";
import Myprofile from "./Pages/Myprofile";

// log out modal will be the modal placed at center and it will show only if the modalstate has some data 
// and this data will be set when we will be clicking the logout button and after if that the confirmation of logout 
// will be handeled by the onclick event



function App() {

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="signup" element={<OpenRoute>
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
        <Route
          path="/about"
          element={
            <About />
          }
        />
        <Route
          path="/contact"
          element={
            <ContactUsForm />
          }
        />
        <Route
          path="/dashboard"
          element={
            <div className="text-white text-center font-bold  capitalize mt-[10%]">error page</div>
          }
        >
        </Route>
        <Route
          element={
            <CloseRoute>
              <DashBoard />
            </CloseRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<Myprofile />} />
          <Route path="dashboard/Settings" element={<Settings />} />
          <Route path="/dashboard/my-courses" element={<div>My courses section</div>} />
          <Route path="/dashboard/enrolled-courses" element={<div>enrolled-courses</div>} />
          <Route path="/dashboard/purchase-history" element={<div>purchase-history</div>} />
          {/* {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route path="dashboard/cart" element={<Cart />} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
          </>
        )
      } */}


        </Route>



      </Routes>
    </div>

  );
}

export default App;
