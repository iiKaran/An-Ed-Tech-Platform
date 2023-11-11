const mongoose = require("mongoose");
const RatingSchema = new mongoose.Schema({
    user:{
     type:mongoose.Schema.Types.ObjectId, 
     ref:"User"
    }, 
    rating:{
     type:Number, 
     required:true
    }, 
    review:{
     type:String, 
     trim:true,
    },
    course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},
})
module.exports= mongoose.model("RatingAndReview",RatingSchema); 
