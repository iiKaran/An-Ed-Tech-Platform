import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { categories } from '../services/apis';
import { apiConnector } from '../services/apiconnector';
import Course_Slider from '../components/core/Catalog/Course_Slider'
import Course_Card from '../components/core/Catalog/Course_Card';
import { getCatalogPageData } from '../services/operations/CatalogApi';
import Footer from '../components/core/common/Footer';
import toast from 'react-hot-toast';


export default function CourseCatalogPage() {
    const [category_id, setCategory_id]= useState(null); 
    const [catalogPageData,setCatalogPageData]= useState(null);
    const {catalogName} = useParams();
    const [active, setActive] = useState(1)
    async function setCategory() {
        try {
          const { CATEGORIES_API } = categories;
          const response = await apiConnector("GET", CATEGORIES_API);
          if (response.data.data.length === 0) {
             toast.error("no categories");
            return null;
          }
          const allCategories = response.data.data; 
          const GetCategory = allCategories.filter(cat =>cat.name===catalogName)[0];
           setCategory_id(GetCategory._id);
           
        } catch (err) {
          console.log("cant get the categories", err);
        }
      }

    async function fetchPageData(){
       const response = await getCatalogPageData(category_id);
       setCatalogPageData(response.data);
     
    }
    useEffect(()=>{
      // find the category id using category name and set it to state
       
      setCategory();
    }, [catalogName]);
    useEffect(()=>{
        // find the courses  whenever cat changes and set it to state  
        if(category_id){
        fetchPageData()
        }
      }, [category_id]);
  return (
    <>
      {/* Hero Section */
      }
      <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25 ">
              {catalogPageData?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5 capitalize">
          {catalogPageData?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading  ">Courses to get you started</div>
        <div className="my-4 mb-8 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Populer
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          <Course_Slider
            Courses={catalogPageData?.selectedCategory?.courses}
          />
        </div>
      </div>
      {/* Section 2 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading capitalize ">
          Top courses in {catalogPageData?.differentCategory?.name}
        </div>
        <div className="py-8">
          <Course_Slider 
            Courses={catalogPageData?.differentCategory?.courses}
          />
        </div>
      </div>
      {/* Section 3 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <Course_Card course={course} key={i} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
