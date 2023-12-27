const mongoose = require("mongoose");
const CourseSchema = new mongoose.Schema({
 
     courseName:{
      type:String , 
      required:true , 
      trim: true
     }, 
     courseDescription:{
      type: String, 
      required: true ,
      trim: true
     }, 
     whatYouWillLearn:{
      type: String,
     },
     ratingAndReview:{
      type: mongoose.Schema.Types.ObjectId, 
      ref :"RatingAndReview"
     },
     instructor:{
      type: mongoose.Schema.Types.ObjectId, 
      ref :"User"
     }, 
     courseContent:[{
      type: mongoose.Schema.Types.ObjectId, 
      ref:"Section"
     }], 
     price:{
      type:Number, 
      required:true 
     }, 
     thumbnail:{
      type: String, 
      required: true, 
      trim: true
     }, 
     category:[{
      type:mongoose.Schema.ObjectId, 
      ref:"Category"
     }], 
     tags:[{
          type:String, 
     }],
     studentsEnrolled:[{
      type:mongoose.Schema.Types.ObjectId, 
      ref: "User"
     }],
     status: {
		type: String,
		enum: ["Draft", "Published"],
	},
     instructions:[{
          type:String, 
     }]
})

module.exports= mongoose.model("Course",CourseSchema); 
