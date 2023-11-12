const express = require("express");
const app = express(); 
const CourseRoutes = require("./routes/Course");
const PaymentRoutes = require("./routes/Payment");
const UserRoutes = require("./routes/User");
const ProfileRoutes = require("./routes/Profile");
const fileUpload = require("express-fileupload");
const cors = require("cors"); 
const cookieParser = require("cookie-parser")
const dbConnect= require("./config/database")
const clouldinaryConnect = require("./config/cloudinary")
// cors  , cookie parser expressfile-upload,
require("dotenv").config();
const PORT = process.env.PORT|| 4000; 
app.use(express.json()); 
app.use(cookieParser());

app.use(
 cors({
  origin:"http://localhost:3000", 
  credentials:true
 })
); 
app.use(fileUpload({
 useTempFiles:true, 
 tempFileDir:"/tmp"
}))
dbConnect();
clouldinaryConnect();
app.use("/api/v1/auth", UserRoutes);
app.use("/api/v1/profile", ProfileRoutes);
app.use("/api/v1/payment", PaymentRoutes);
app.use("/api/v1/course", CourseRoutes);


app.get("/",(req , res)=>{
 return res.json({
  success: true , 
 message: " server is up"
 })
})


app.listen(PORT , ()=>{
 console.log("App is running live");
})