import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/core/HomePage/Button";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  setCourseSectionData,
  setEntireCourseData,
  setCurrentLecureData,
  updateCompletedLectures,
} from "../../slices/viewCourseSlice";
import { askAnEnquiry, markLectureAsComplete } from "../../services/operations/CourseApi";
export default function MainView() {
  const { courseEntireData, courseSectionData, currentLectureData } =
    useSelector((state) => state.viewCourse);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  const [lastVideo, setLastVideo] = useState(false);
  const [firstVideo, setFirstVideo] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
   useEffect(()=>{
    setValue("AskTo",courseEntireData?.[0]?.instructor?._id);

   },[])
  async function QueryHandler(data,event) {
    console.log("wrf ",courseEntireData?.[0]?.instructor?._id)
     
    event.preventDefault();
    data.askTo = courseEntireData?.[0]?.instructor?._id
    const result = await askAnEnquiry(data,token); 
  }

  function nextHandler() {
    if (lastVideo) {
      alert("Last Video Cant GO next");
    } else {
      let sectionIndex = -1;
      let newSection = -1;
      let lectureIndex = -1;
      courseEntireData?.[0]?.courseContent.forEach((element, index) => {
        if (element._id === courseSectionData._id) {
          sectionIndex = index;
          element?.subSections?.forEach((lecture, index) => {
            if (lecture._id === currentLectureData._id) {
              lectureIndex = index;
            }
          });
        }
      });
      // now i have indexes
      if (lectureIndex === courseSectionData?.subSections?.length - 1) {
        sectionIndex++;
        lectureIndex = 0;
      }
      else{
        lectureIndex++;
      }
      dispatch(
        setCourseSectionData(
          courseEntireData?.[0]?.courseContent?.[sectionIndex]
        )
      );
      dispatch(
        setCurrentLecureData(
          courseEntireData?.[0]?.courseContent?.[sectionIndex]?.subSections?.[
            lectureIndex
          ]
        )
      );
    }
  }
  function prevHandler() {
    if (firstVideo) {
      alert("First Video Cant GO prev");
    } else {
      let sectionIndex = -1;
      let newSection = -1;
      let lectureIndex = -1;
      courseEntireData?.[0]?.courseContent.forEach((element, index) => {
        if (element._id === courseSectionData._id) {
          sectionIndex = index;
          element?.subSections?.forEach((lecture, index) => {
            if (lecture._id === currentLectureData._id) {
              lectureIndex = index;
            }
          });
        }
      });
      // now i have indexes
      if (lectureIndex === 0) {
        sectionIndex--;
        lectureIndex =
          courseEntireData?.[0]?.courseContent?.[sectionIndex]?.subSections
            ?.length - 1;
      }
      else{
        lectureIndex--;
      }
      dispatch(
        setCourseSectionData(
          courseEntireData?.[0]?.courseContent?.[sectionIndex]
        )
      );
      dispatch(
        setCurrentLecureData(
          courseEntireData?.[0]?.courseContent?.[sectionIndex]?.subSections?.[
            lectureIndex
          ]
        )
      );
    }
  }
  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      {
        courseId: courseEntireData?.[0]._id,
        subsectionId: currentLectureData._id,
      },
      token
    );
    if (res) {
      dispatch(updateCompletedLectures(currentLectureData._id));
    }
    setLoading(false);
  };

  function isLastVideo() {
    let sectionIndex = -1;
    let lectureIndex = -1;
    courseEntireData?.[0]?.courseContent.forEach((element, index) => {
      if (element._id === courseSectionData._id) {
        sectionIndex = index;
        element?.subSections?.forEach((lecture, index) => {
          if (lecture._id === currentLectureData._id) {
            lectureIndex = index;
          }
        });
      }
      if (
        sectionIndex === courseEntireData?.[0]?.courseContent.length - 1 &&
        (lectureIndex === courseSectionData?.subSections?.length - 1 ||
          lectureIndex === -1)
      )
        setLastVideo(true);
      else setLastVideo(false);
    });
  }
  function isfirstVideo() {
    let sectionIndex = -1;
    let lectureIndex = -1;
    courseEntireData?.[0]?.courseContent.forEach((element, index) => {
      if (element._id === courseSectionData._id) {
        sectionIndex = index;
        element?.subSections?.forEach((lecture, index) => {
          if (lecture._id === currentLectureData._id) {
            lectureIndex = index;
          }
        });
      }
      if (sectionIndex === 0 && (lectureIndex === 0 || lectureIndex === -1))
        setFirstVideo(true);
      else setFirstVideo(false);
    });
  }
  const location = useLocation();
  useEffect(() => {
    isfirstVideo();
    isLastVideo();
  }, [currentLectureData]);
  return (
    <div className=" flex flex-col items-center justify-center">
      <div className="flex flex-row  py-8 gap-4 w-[100%] justify-end items-center">
        {!firstVideo && (
          <button onClick={prevHandler}>
            <Button>Prev</Button>
          </button>
        )}
        {!lastVideo && (
          <button onClick={nextHandler}>
            <Button>Next</Button>
          </button>
        )}
        <button>
          <Button active={true}>Mark as Completed</Button>
        </button>
      </div>
      <div className="player  w-[70vw] mb-10 text-center">
        <span className=" rounded-md inline-block mt-12">
           <ReactPlayer
            url={currentLectureData?.videoUrl}
            controls={true}
            width={"50vw"}
          /> 
        </span>
      </div>
      <div className="borde w-[80vh] mx-auto flex flex-col gap-4">
        <span className="font-bold text-[30px]  inline-block   text-xl">
          {currentLectureData?.title}
        </span>
        <span className=" text-sm text-richblack-400 inline-block ">
          {currentLectureData?.description}
        </span>
      </div>
      <div className="text-white w-[80vh] px-4  mt-12 flex flex-col gap-4">
        <h1 className=" font-bold text-[1.3vmax] ">Ask Any Doubt?</h1>
        <form
          className="flex flex-col section mb-48"
          onSubmit={handleSubmit(QueryHandler)}
        >
          <label htmlFor="query" className="label-style">
            <textarea
              type="text"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full border rounded-[.3rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
              name="query"
              id="query"
              placeholder="Enter Any Question ?"
              {...register("question", {
                required: "Question Cant be empty",
              })}
              rows={4}

            />
            {errors.question && (
              <p className="text-pink-100 py-2 opacity-70 text-sm capitalize">
                {errors.question.message} "jsb"
              </p>
            )}
          </label>
          <button className=" w-[20%] mt-4  bg-yellow-25  text-black py-2 rounded-md" type="submit">
              Submit
          </button>
        </form>
      </div>
    </div>
  );
}
