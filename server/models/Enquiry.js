const mongoose = require("mongoose");
const enquirySchema = new mongoose.Schema({

    question:{
         type:String , 
         trim:true,
    },
    answer:{
        type:String , 
        trim:true,
        default:null ,
    },
    askBy:{
         type:mongoose.Schema.Types.ObjectId, 
         ref:"User"
    }, 
    askTo:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"User"
   }, 
    respondBy:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"User",
    
    }
})
module.exports = mongoose.model("Enquiry",enquirySchema);