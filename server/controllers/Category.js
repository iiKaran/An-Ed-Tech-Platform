const Category = require("../models/Category"); 
// to create category
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}
exports.createCategory = async(req, res)=>{
 try{
   // fetch data 
   const { name , desc }= req.body; 
   if(!name || !desc){
    res.status(400).json({
     success: false , 
     message: "All fields are required"
    })
   }
   const catDetails = await Category.create({
    name , description:desc
   })
   res.status(200).json({
    success:true , 
    message: "Category Created"
   })
 }
 catch(err){
  console.log(err)
  res.status(500).json({
   success: false , 
   message: "Error while creating a Category"
  })
 }
}
// get all categories
exports.showAllCategories = async (req, res)=>{
 try{
     const allcats= await Category.find({});
     res.status(200).json({
         success: true , 
         message: " chko categories", 
         data:allcats
     })
 }
 catch(err){
  console.log(err)
  res.status(500).json({
   success: false , 
   message: "Error while getting a caqtegory"
  })
 }
}
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body
    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId).populate({
        path: "courses",
        // match: { status: "Published" },
        // populate: "ratingAndReviews",
      })
      .exec()

    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.")
      return res
        .status(404)
        .json({ success: false, message: "Category not found" })
    }
    // Handle the case when there are no courses
    if (selectedCategory.courses.length === 0) {
      console.log("No courses found for the selected category.")
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      })
    }

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    })
    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "courses",
        match: { status: "Public" },
      })
      .exec()
    // Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Public" },
      })
      .exec()
    const allCourses = allCategories.flatMap((category) => category.courses)
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10)

    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
        
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}