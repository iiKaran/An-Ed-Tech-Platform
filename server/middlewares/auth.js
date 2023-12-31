const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
// auth middle ware  
exports.auth = async (req, res, next) => {
     try {
          // extract token 

          const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
          // if token is missing 
          console.log("the comg token", token);
          if (!token) {
               res.status(401).json({
                    success: "False",
                    message: "Token is missing"
               })
          }
          // token verify to auntheticate
          try {
               require("dotenv").config();
               const decode = jwt.verify(token, process.env.JWT_SECRET);
               console.log("data", decode);
               req.user = decode;
          }
          catch (err) {
               console.log(err);
               res.status(400).json({
                    success: false,
                    message: "Something went wrong"
               })
          }
          next();
     }
     catch (err) {
          console.log(err);
          res.status(400).json({
               success: false,
               message: "Something went wrong"
          })
     }
}
// isStudent
exports.isStudent = async (req, res, next) => {
     const role = req?.user?.role;
     console.log("the role at student", role);
     if (role !== "Student") {
          return res.status(404).json({
               success: false,
               message: " This is for the students only"
          })
     }
     next();
}
// isAdmin 
exports.isAdmin = async (req, res, next) => {

     const role = req.user.role;
     if (role !== "Admin") {
          return res.status(404).json({
               success: false,
               message: " This is for the Admins only"
          })
     }
     next();
}

// isInstructer

exports.isInstructor = async (req, res, next) => {

     const role = req?.user?.role;

     console.log(role)
     if (role !== "Instructor") {
          return res.status(404).json({
               success: false,
               message: " This is for the Instructors only"
          })
     }
     next();
}