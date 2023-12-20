
const Profile = require("../models/Profile");
const User = require("../models/User");

const { uploadImagetoCloudinary } = require("../utilities/ImageUploader");
// update profile 

exports.updateProfile = async (req, res) => {

  try {
    const { firstName, lastName, gender, dateofbirth, about, contact } = req.body;
    const id = req.user.id;
    if (!id) {
      res.status(500).json({
        success: false,
        message: " Missing details"
      })
    }
    const userDetails = await User.findById(id);


    const profileId = userDetails.additionalDetails;
    const profile = await Profile.findById(profileId);
    profile.dateofbirth = dateofbirth;
    profile.gender = gender;
    profile.about = about;
    profile.contact = contact;
    await profile.save();
    const updatedUser = await User.findByIdAndUpdate(id, {
      firstName: firstName,
      lastName: lastName
  },{new:true}).populate("additionalDetails")
    return res.status(200).json({
      success: true,
      message: "Profile Updated Succesfully",
      data:updatedUser
    })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: " something went wrong while updatin profile",
      data: updatedUser
    })
  }
}

// delete account
exports.deleteAccount = async (req, res) => {
  try {
    // delete account 
    // get id 
    const id = req.user.id;
    console.log(id)
    // validate id  
    const userDetails = await User.findById(id);
    console.log(userDetails)
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "user doesnot exist",
      })
    }
    // get profile id and delete the profile 
    const profileId = userDetails.additionalDetails;
    await Profile.findByIdAndDelete(profileId);
    // delete the user then 
    await User.findByIdAndDelete(id);
    // update the  courses in which student is enrolled
    // crone job 
    // how to schedule the delete function 
    // return response
    return res.status(200).json({
      success: true,
      message: "account delete Succesfully",
    })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: " something went wrong"
    })
  }
}
exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    console.log(userDetails);
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadImagetoCloudinary(
      displayPicture,
      "StudyNotion",
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    ).populate("additionalDetails")
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate("courses")
      .exec()
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};