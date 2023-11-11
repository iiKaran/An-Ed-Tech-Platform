// Course-> create , getallcourse,tags , 
// Section-> crud Section 
// subection -> crud Subsection

const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/Category");
const {uploadImagetoCloudinary} = require("../utilities/ImageUploader");
// createCourse 
exports.createCourse = async (req, res) => {
	try {
		// Get user ID from request object
		const userId = req.user.id;

		// Get all required fields from request body
		let {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			category,
			status,
			instructions,
		} = req.body;

		// Get thumbnail image from request files
		const thumbnail = req.files.thumbnail;

		// Check if any of the required fields are missing
		// if (
		// 	!courseName ||
		// 	!courseDescription ||
		// 	!whatYouWillLearn ||
		// 	!price ||
		// 	!tag ||
		// 	!thumbnail ||
		// 	!category
		// ) {
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "All Fields are Mandatory",
		// 	});
		// }
		if (!status || status === undefined) {
			status = "Draft";
		}
		// Check if the user is an instructor
		const instructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		});

		if (!instructorDetails) {
			return res.status(404).json({
				success: false,
				message: "Instructor Details Not Found",
			});
		}

		// Check if the tag given is valid
		const categoryDetails = await Category.findById(category);
		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
		}
		// Upload the Thumbnail to Cloudinary
		const thumbnailImage = await uploadImagetoCloudinary(
			thumbnail,
			"StudyNotion"
		);
		console.log(thumbnailImage);
		// Create a new course with the given details
		const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn,
			price,
			tag: tag,
			category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
		});

		// Add the new course to the User Schema of the Instructor
		await User.findByIdAndUpdate(
			{
				_id: instructorDetails._id,
			},
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);
		// Add the new course to the Categories
		await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					course: newCourse._id,
				},
			},
			{ new: true }
		);
		// Return the new course and a success message
		res.status(200).json({
			success: true,
			data: newCourse,
			message: "Course Created Successfully",
		});
	} catch (error) {
		// Handle any errors that occur during the creation of the course
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create course",
			error: error.message,
		});
	}
};

// getAll course
exports.getAllCourses = async (req, res) => {

 try {
  const allCourses = await Course.find({}, {
   courseName: true,
   courseDescription: true,
   thumbnail: true,
   instructer: true,
   ratingAndReview: true,
   studentsEnrolled: true,
   instructer: true
  }).populate("instructer")
  return res.status(200).json({
   response: allCourses,
   message: " Fetched All courses",
   success: true
  })
 }
 catch (err) {
  console.log(err);
  res.status(400).json({
   success: false,
   message: err.message
  })
 }
}

// all course details after populating everything 

exports.getCourseDetails = async (req, res) => {

 try { // get course id 
  const courseId = req.body;
  // find the details of course 
  const courseDetails = await Course.find({ _id: courseId }).populate({
   path: "instructor",
   populate: {
    path: "additionalDetails",
   },
  }).populate("category")
  // .populate("ratingAndreview")
  .populate({
   path: "courseContent",
   populate: {
    path: subSection
    ,
   },
  }).exec();
  // populate everything and then return res
  if (!courseDetails) {
   return res.status(400).json({
    success: false,
    mesaage: "Could not find the course"
   })
  }
  return res.status(200).json({
   success: true,
   mesaage: "Course details fetched succesfully",
   response: courseDetails,
  })
 }
 catch (err) {
		 console.log(err)
  return res.status(500).json({
   success: false,
   mesaage: " something went wrong while getting corse details"
  })
 }
}