const SubSection = require("../models/SubSection");

const Section = require("../models/SubSection")
const { uploadImagetoCloudinary } = require("../utilities/ImageUploader");

// create subsection
exports.createSubSection = async (req, res) => {

  try {

    const { title, timeDuration, description, sectionId } = req.body;
    const video = req.files.file;
  console.log(video)
    if (!title || !timeDuration || !description || !sectionId) {
      return res.status(500).json({
        success: false,
        message: " details are missing "
      })
    }
    const uploadDetails = await uploadImagetoCloudinary(
      video,
      "StudyNotion"
    )

     const url =uploadDetails.secure_url;
    const newSubSection = SubSection.create({
      title,
      description,
      timeDuration,
      videoUrl:url
    });

    const updatedSection = await Section.findByIdAndUpdate(sectionId, {
      $push: { subSections: newSubSection._id }
    }, { new: true })


    res.status(200).json({
      success: true,
      message: " subsection created succesfully"
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
     const {subSectionId} = req.body ; 
     if(!subSectionId){
      return res.status(500).json({
        success: false,
        message: " details are missing "
      })
     }
     await SubSection.findByIdAndDelete(subSectionId);
     res.status(200).json({
      success:true, 
      message:"Subsection deleted succesfully"
     })
  }
  catch (err) {
    res.status(500).json({
      success: false,
      message: " Something Went Wrong"
    })
  }
}