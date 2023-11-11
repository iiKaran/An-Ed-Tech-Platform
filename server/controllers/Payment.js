const { default: mongoose } = require("mongoose");
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const { MailSender } = require("../utilities/MailSender")
// templates for mail 




// steps 
// capture the payment first 
exports.capturePaymemt = async (req, res) => {

 try {
  // get user id and course id  
  const { courseId } = req.body;
  const userId = req.user.id;


  if (!courseId) {
   res.status(400).json({
    success: false,
    message: " provide valid course"
   })
  }

  // check validaity of both ids and 
  try {
   let courseDetails = await Course.findById(courseId);
   if (!courseDetails) {
    res.status(500).json({
     success: false,
     message: "Mot a valid course"
    })
   }
   // check that user does not have the course 
  
   const uid = new mongoose.Types.ObjectId(userId);
   if (course.studentEnrolled.includes(uid)) {
    res.status(400).json({
     success: false,
     message: "User is Already Registered"
    })
   }
   const amount = courseDetails.price;
   const currency = "INR";
   // create the order and send the response
   const options = {
    amount: amount * 100,
    currency: currency,
    receipt: Math.random(Date.now()).toString(),
    notes: {
     userId,
     courseId
    }
   };
   try {
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse)
   }
   catch {
    res.status(500).json({
     success: false,
     message: "Something went wrong while paying"
    })
   }
  }
  catch (err) {
   res.status(500).json({
    success: false,
    message: "Something went wrong"
   })
  }
  res.status(200).json({
   success:true , 
   message:"Suceessfylly paid", 
   courseDetails:courseDetails, 
   orderId:paymentResponse.id , 
   amount:paymentResponse.amount
  })
 }
 catch (err) {
  res.status(500).json({
   success: false,
   message: "Something went wrong"
  })
 }


}

exports.verifySignature = async (req, res)=>{
 
   // matching of razorpay secret and server '
 try{   const webHookSecret = "1234567"; 
   // HMAC-> USE ALGO + SECRET 
   // SHA-> ALGO
   // CHECKSUM
   const razorHookSecret = req.headers("x-razorpay-signature"); 
   let encryptedSecret = crypto.createHmac("sha256",webHookSecret); 
   encryptedSecret.update(JSON.stringify(req.body));
// after running the hashing the output is in hexadecimal form called  digest

 const digest = encryptedSecret.digest("hex"); 
 
   if(digest!==razorHookSecret)
   {
     res.status(404).json({
     success:false , 
     message:"Not authorized"
     })
   }
   
   // // 
   // now the payment is authorized i have to do some action that is student is enrolled in course 
   console.log("Payment is authorized"); 
   const {courseId , userId } = req.body.payload.payment.entity.notes; 
   try{
    // action  
    // enroll student
    const enrolled = await Course.findOneAndUpdate(courseId,{
     $push:{
      studentEnrolled:userId
     }
    },{new:true});
    if(!enrolled)
    {
   return res.status(400).json({
    success: false , 
    message: "Some thing went wrong"
   })
    }
    const addedCourse = await Course.findOneAndUpdate(userId,{
     $push:{
     courses:courseId
     }
    },{new:true});
    
    const emailresponse = MailSender(enrolled.email,"Course Bought","thanks for buying ");
    return res.status(200).status({
        
     success: true , 
     message: "course buyed"
    })
   }
   catch(err){
    return res.status(500).json({
     success: false , 
     message: "Error occured"
    })
   }

  
}
catch(err)
{
     return res.status(500).json({
      success: false , 
      message: "Error occured"
     })
}

}