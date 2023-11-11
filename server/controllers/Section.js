// course-> section-> subsection 
// crete a subsection add it to section then add the section into tjhe course 



// for a section a handler functions are  
// create section 
// update section
// delete section 


const Section = require("../models/Section");
const Course = require("../models/Course");
exports.createSection = async (req, res) => {
 try {
  // fetch the data
  const { sectionName, courseId } = req.body;
  // validate data 
  if (!sectionName || !courseId) {
   res.status(500).json({
    success: false,
    message: " Missing details"
   })
  }
  // create section 
  const newSection = await Section.create({
   sectionName
  });
  // update the course 
  const updatedCourse = await Course.findByIdAndUpdate(courseId, {
   $push: {
    courseContent: newSection._id
   }
  }, { new: true })

  // return response 
  return res.status(200).json({
   success: true,
   message: " section created"
  })

 }
 catch (err) {
  return res.status(500).json({
   success: false,
   message: err.message
  })
 }
}
exports.updateSection = async (req, res) => {
 try {

  // fetch
  const { sectionId, newsectionName } = req.body;
  // validate
  if (!newsectionName || !sectionId) {
   res.status(500).json({
    success: false,
    message: " Missing details"
   })
  }
  const newSection = await Section.findByIdAndUpdate(
   sectionId,
   { sectionName: newsectionName }, 
   {new:true}
  )
  return res.status(200).json({
   success: true,
   message: " section updated", 
   response:newSection
  })
 }

 catch (err) {
    console.log(err);
  return res.status(500).json({
   success: false,
   message: err.message
  })
 }
}
exports.deleteSection = async (req, res) => {
 try {
  // sending the id in parns
      const {sectionId} = req.body; 
      
      // validate 
      if(!sectionId){
       res.status(500).json({
        success: false,
        message: " Missing details"
       })
      }
      const removedSection = await Section.findByIdAndDelete({_id:sectionId});
  
      // update the course do we need to delete the entry from course schema ?? 
      
      return res.status(200).json({
       success: true,
       message: " section updated", 
      })
      
 }
 catch (err) {
  return res.status(500).json({
   success: false,
   message: err.message
  })
 }
}