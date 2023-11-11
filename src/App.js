import "./App.css";
import {Routes, Route} from "react-router-dom"
import Home from "./Pages/Home";
import Navbar from "./components/core/common/Navbar"
function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
   <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
    </Routes>
    </div>

  );
}

export default App;
