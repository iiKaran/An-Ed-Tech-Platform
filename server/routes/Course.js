const express = require("express"); 
const  router = express.Router();
const {auth, isAdmin, isInstructor , isStudent} = require("../middlewares/auth");
// All course controllers
const { createCourse, getAllCourses, getCourseDetails,enrollInCourse,enrolledCourses, updateStatus} = require("../controllers/Course");
// All category controllers
const {createCategory,showAllCategories, categoryPageDetails} = require("../controllers/Category");
// all rating and review controllers
const {createRating,averageRating,getAllRating} = require("../controllers/RatingandReview"); 
// all section Controllers
const {createSection, updateSection, deleteSection} = require("../controllers/Section"); 
// all subsection controllers  
const {createSubSection, updateSubSection, deleteSubSection} = require("../controllers/SubSection");
//  course  has 3 types of route -> 
 // !    1. create/update/delete course that is by instructer that includes section api and subsections apis a;so
//  !     2. category controlls  that is by Admin 
//  !     3. Rating and Review to the cousrse that is by admin



// course routes mounted  
    
    // create a course 
    router.post("/createCourse",auth , isInstructor,createCourse); 
    // create/update/delete a section 
    router.post("/createSection",auth , isInstructor, createSection); 
    router.post("/updateSection", auth , isInstructor, updateSection); 
    router.post("/deleteSection", auth , isInstructor ,deleteSection); 
    // create/update/delete a subsection 
    router.post("/createSubSection",auth , isInstructor, createSubSection); 
    router.post("/updateSubSection", auth , isInstructor, updateSubSection); 
    router.post("/deleteSubSection", auth , isInstructor ,deleteSubSection); 
    //get all courses
    router.get("/getAllCourses",auth,isInstructor,getAllCourses)
    // Get Details for a Specific Courses
    router.post("/getCourseDetails", getCourseDetails)

    // category routes mounted  

    router.post("/createCategory",auth, isInstructor, createCategory); 
    router.get("/showAllCategories", showAllCategories);
    router.post("/getCategoryPageDetails", categoryPageDetails);

 // Rating and review routes mounted 
 router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating",averageRating)
router.get("/getReviews",getAllRating)


// temp route to enrol in the course 
router.post("/enrollinCourse", auth , isStudent,enrollInCourse);
router.get("/getEnrolledCourses", auth ,isStudent,enrolledCourses);


// update the course status 
router.post("/updateCourseStatus",auth,isInstructor,updateStatus);

module.exports = router;