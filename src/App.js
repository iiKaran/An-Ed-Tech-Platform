import "./App.css";
import {Routes, Route} from "react-router-dom"
import Home from "./Pages/Home";
import Navbar from "./components/core/common/Navbar"
import Signup from "./Pages/SignUp";
import Login from "./Pages/Login";
function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
   <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}></Route> 
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
    </Routes>
    </div>

  );
}

export default App;
