// Course-> create , getallcourse,tags , 
// Section-> crud Section 
// subection -> crud Subsection

const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/Category");
const {uploadImagetoCloudinary} = require("../utilities/ImageUploader");
const courseProgress = require("../models/CourseProgress");

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
		if(tag)
		tag = tag.split(',');
	      
		if(instructions)
		instructions = instructions.split(',');
        console.log("requirement",instructions,typeof(instructions));
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

        console.log("tahs are",tag,typeof(tag));
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
			instructor:userId,
			whatYouWillLearn:whatYouWillLearn,
			price,
			tags: tag,
			category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
		});

		// Add the new course to the User Schema of the Instructor
		await User.findByIdAndUpdate(
			userId,
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
					courses: newCourse._id,
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
exports.enrollInCourse = async(req, res)=>{
	try{
       const userId = req.user.id;
	   const {courseId}= req.body;

	   const foundCourse =await Course.findById(courseId)
	   if(!foundCourse)
	   {
		return res.status(404).json({
			success:false , 
			message:"no such course found"
		})
	   }
	    // console.log(foundCourse)
	   const check = foundCourse?.studentsEnrolled?.includes(userId);
	   if(check)
	   {
		return res.status(403).json({
			success:false, 
			message:"Already Enrolled", 
		})
	   }

	   const updatedUser = await User.findByIdAndUpdate(userId ,{
		$push:{courses:courseId}
	   },{
		new:true
	   })
	   const courseUpdated = await Course.findByIdAndUpdate(courseId,{
		$push:{studentsEnrolled:userId}
	   },{new:true});
       
	   const courseProgressCreated = await courseProgress.create({
		courseId:courseId, 
		userId:userId
	   }); 
	   console.log("the progress", courseProgressCreated)
	   return res.status(200).json({
		success:true, 
		message:"succesfully enrolled", 
		data:updatedUser
	   })
	}
	catch(err){
		console.log(err); 
		return res.status(500).json({
			success:false , 
			message:"something went wrong while enrolling"
		})
	}
}

exports.enrolledCourses = async(req, res)=>{
	try{
       const userId = req.user.id;
	   const user = await User.findById(userId).populate({
		path: "courses",
		populate: {
		 path: "courseContent",
		 populate:{
			path:"subSections"
		 }
		}});
		const courses = user["courses"];
		let ans =[]
		for(let i =0; i < courses.length;i++)
		{
			let course = courses[i];
			let prog= await courseProgress.findOne({
				courseId: course._id,
				userId: userId,
			  })
				.populate({
				  path: "courseId",
				  populate: {
					path: "courseContent",
				  },
				})
				.exec();
                
				if (!prog) {
					return res
					  .status(400)
					  .json({ error: "Can not find Course Progress with these IDs." });
				  }
				  let lectures = 0;
				  prog.courseId.courseContent?.forEach((sec) => {
					lectures += sec.subSections.length || 0;
				  });
			  
				  let progressPercentage =
					(prog.completedVideos.length / lectures) * 100;
			  
				  // To make it up to 2 decimal point
				  const multiplier = Math.pow(10, 2);
				  progressPercentage =
					Math.round(progressPercentage * multiplier) / multiplier;
				const newobj = {
					_id:course._id , 
					duration:lectures, 
					courseName: course.courseName, 
					courseDescription:course.courseDescription,
					courseContent:course.courseContent,
					progress:progressPercentage,
					thumbnail:course.thumbnail
 
				}

				ans.push(newobj)
		}



	   return res.status(200).json({
		success:true, 
		message:"succesfully enrolled", 
		data:ans
	   })
	}
	catch(err){
		console.log(err); 
		return res.status(500).json({
			success:false , 
			message:"something went wrong while enrolling"
		})
	}
}
exports.getAllCourses = async (req, res) => {
 try {
  const userId = req.user.id;

  const user = await User.findById(userId).populate("courses");

  const allCourses =  user.courses; 
  return res.status(200).json({
   data: allCourses,
   message: "Fetched All courses",
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
  const {courseId} = req.body;
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
    path: "subSections"
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
   data: courseDetails,
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

exports.updateStatus = async(req, res)=>{
	try{
		const {course_id} = req.body; 
        const updatedCourse = await Course.findByIdAndUpdate(course_id,{
			status:"Public"
		}); 
		
		
		return res.status(200).json({
			success:true, 
			message:"Course Get Public"
		})
	}
	catch(err)
	{
		return res.status(500).json({
			success:false, 
			message:"Error While Changing Status"
		})
	}
}