const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

 firstName: {
  type: String,
  required: true,
  trim: true
 },
 lastName: {
  type: String,
  required: true,
  trim: true
 },
 email: {
  type: String,
  required: true,
  trime: true,
 },
 password: {
  type: String,
  required: true,
  trim: true
 },
 accountType: {
  type: String,
  enum: ["Admin", "Student", "Instructor"]
 },
 active: {
  type: Boolean,
  default: true,
 },
 approved: {
  type: Boolean,
  default: true,
 },
 image: {
  type: String,
 },

 additionalDetails: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Profile"
 },
 courses: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Course"
 }],
 courseProgress: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "CourseProgress"
 }, 
 token:{
  type:String, 
 }, 
 resetPasswordExpires:{
  type:Date
 }, 
 cart:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course"
 }]
},{ timestamps: true });
module.exports= mongoose.model("User", userSchema);