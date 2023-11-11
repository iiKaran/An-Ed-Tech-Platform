const Category = require("../models/Category"); 
// to create category
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
     const allcats= await Category.find({},{name:true , description:true});
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
exports.categoryPageDetails = async( req , res)=>{

  try{
   // get category 
   const {categoryId} = req.body ; 
   // get all the courses  for same caxtegory
   const selectedCategory = await Category.findById(categoryId).populate("courses").exec(); 
   // validation 
   if(!selectedCategory)
   {
    res.status(404).json({
      success: false , 
      message: "data not found"
    })
   }
   // get courses for different category 
   const differentCategories = await Category.find(
    { _id:{$ne:categoryId}}
   ).populate("courses").exec();

   // get top selling courses 

   // return response
   return res.status(200).json({
    success: true, 
    mesaage:"get the courses",
    data:{
    selectedCourses: selectedCategory, 
    differentCourses: selectedCategory
    }
  })
  }
  catch(err)
  {
            return res.status(500).json({
              success: false , 
              mesaage:" internal server error"
            })
  }
}