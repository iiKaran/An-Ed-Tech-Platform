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
function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="signup" element={  <OpenRoute>
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
                <ContactUsForm/>
            }
          />
        </Routes>
    </div>

  );
}

export default App;
