const SubSection = require("../models/SubSection");
const mongoose = require("mongoose");
const Section = require("../models/Section")
const Course = require("../models/Course");
const { uploadImagetoCloudinary } = require("../utilities/ImageUploader");

// create subsection
exports.createSubSection = async (req, res) => {
  try {

    const { title, link, description, section_id, course_id } = req.body;
  
    console.log("thwe requested")
    if (!title || !description || !section_id || !course_id) {
      return res.status(500).json({
        success: false,
        message: " details are missing "
      })
    }
   console.log(section_id)

    const newSubSection = await SubSection.create({
      title,
      description,
      videoUrl:link
    });

    const updatedSection = await Section.findByIdAndUpdate(section_id, {
      $push: { subSections: newSubSection._id }
    }, { new: true }).populate("subSections"); 
  
    console.log("updated section",updatedSection);

    const updatedCourse = await Course.findById({_id:course_id}).populate({
      path: 'courseContent',
      populate:{
        path:'subSections',
      },
    }).exec();
   
   
    console.log("the updated course", updatedCourse)

    res.status(200).json({
      success: true,
      message: " subsection created succesfully", 
      data:updatedCourse
    })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: " Something Went Wrong"
    })
  }
}
// update subsectionsection
exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body
    const subSection = await SubSection.findById(sectionId)
    console.log(subSection)
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      })
    }

    if (title !== undefined) {
      subSection.title = title
    }

    if (description !== undefined) {
      subSection.description = description
    }
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video
      const uploadDetails = await uploadImagetoCloudinary(
        video,
        "StudyNotion"
      )
      subSection.videoUrl = uploadDetails.secure_url
      subSection.timeDuration = `${uploadDetails.duration}`
    }

    await subSection.save()

    return res.json({
      success: true,
      message: "Section updated successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    })
  }
}

//delete subsection 
exports.deleteSubSection = async (req, res) => {
  try {
     const {subsection_id, course_id} = req.body ; 
     console.log("del req",subsection_id, course_id)
     const subSectionId = subsection_id;
     if(!subSectionId){
      return res.status(500).json({
        success: false,
        message: " details are missing "
      })
     }
     await SubSection.findByIdAndDelete(subSectionId);
     const updatedCourse = await Course.findById({_id:course_id}).populate({
      path: 'courseContent',
      populate:{
        path:'subSections',
      },
    }).exec();

     res.status(200).json({
      success:true, 
      message:"Subsection deleted succesfully",
      data:updatedCourse
     })
   
  }
  catch (err) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      
    })
  }
}