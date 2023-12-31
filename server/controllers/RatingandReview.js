const RatingAndReview = require("../models/RatingAndReview"); 

const Course = require("../models/Course"); 
const {mongoose } = require("mongoose");

// create rating 
exports.createRating = async(req , res)=>{
 try{
  // get user id 
     const userId = req.user.id ; 
  // get course id , review , rating 
     const{courseId ,rating , review} = req.body ; 
 
     console.log("req come with", courseId , review , rating, userId)
  // validate check user has the respective course 
      const courseDetails = await Course.findOne({
       _id:courseId, 
       studentsEnrolled:{$elemMatch:{$eq:userId},
      }
      }); 
    
   // if(!courseDetails)
   // {
   //  return res.status(400).json({
   //   success: false , 
   //   message: "student is not enrolled in the course"
   //  })
   // }
  // user already posted the review
  const alreadyReviewed = await RatingAndReview.findOne(
  { user:userId, 
   course:courseId}
  )
  if(alreadyReviewed)
  {
   return res.status(403).json({
    success: false , 
    message: "course is already reviewed by user"
   })
  }
  // create rating and review 
  const ratingReview = await RatingAndReview.create({
   user:userId, 
   course:courseId , 
   rating , 
   review,
  })
  // attach it to the respective course 
  await Course.findByIdAndUpdate(courseId , 
   {
    $push:{
     ratingAndReview:ratingReview._id
    }
   })
  // return the response 
  return res.status(200).json({
   success: true , 
   message: "Reviewed Succesfully"
  })

 }
 catch(err){
return  res.status(500).json({
   success: false , 
   message: "something went wrong"
  })
 }
}
// average rating 
exports.averageRating = async(req , res)=>{
 try{
// aggeregation 
// get course id 
const {courseId} = req.body ; 
// calculate  avg rating
const result = await RatingAndReview.aggregate([
 {
  $match:{
   course:new mongoose.Types.ObjectId(courseId),
  },
 },
  {
   $group:{
    _id:null , 
    averageRating:{$avg:"$rating"},
   }
  }
])

// return response 
if( result.length> 0)
{
   return res.status(200).json({
    success: true, 
    message: "get avg rating",
    averageRating: result[0].averageRating
   })
}
return res.status(200).json({
 success: true, 
 message: "no avg rating",
 averageRating:0,
})
 }
 catch(err){ 
 return res.status(500).json({
   success: false , 
   message: "something went wrong"
  })
  
 }
}
// get all rating 
exports.getAllRating = async(req , res)=>{
 try{
     const {courseID} = req.body ; 
     
     const result = await RatingAndReview.find({},
      {
       course:true , 
       user: true, 
       rating: true, 
       review: true
      }).sort({rating:"desc"})
      .populate({
       path:"user",
       select: "firstName lastName email image "
      })
      .populate({
       path:"course", 
       select: "courseName"
      });
      
      return res.status(200).json({
       success:true , 
       message:"Reviews fetch successfully", 
       response: result
      })
 }
 catch(err){
 return  res.status(500).json({
   success: false , 
   message: "something went wrong"
  })
  
 }
}
