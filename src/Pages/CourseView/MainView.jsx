import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/core/HomePage/Button";
import { useLocation } from "react-router-dom";
import {
  setCourseSectionData,
  setEntireCourseData,
  setCurrentLecureData,
  updateCompletedLectures
} from "../../slices/viewCourseSlice";
import { markLectureAsComplete } from "../../services/operations/CourseApi";
export default function MainView() {
  const { courseEntireData, courseSectionData, currentLectureData } =
    useSelector((state) => state.viewCourse);
  const dispatch = useDispatch();
  const [lastVideo, setLastVideo] = useState(false);
  const [firstVideo, setFirstVideo] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

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
      { courseId: courseEntireData?.[0]._id, subsectionId: currentLectureData._id },
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
        {!lastVideo && (
          <button onClick={nextHandler}>
            <Button>Next</Button>
          </button>
        )}
        {!firstVideo && (
          <button onClick={prevHandler}>
            <Button>Prev</Button>
          </button>
        )}
        <button>
          <Button active={true}>Mark as Completed</Button>
        </button>
      </div>
      <div className="player  w-[70vw] h-[800px] text-center">
        <span className=" rounded-md inline-block mt-12">
          <ReactPlayer
            // url={currentLectureData?.videoUrl}
            controls={true}
            width={"50vw"}
          />
        </span>
      </div>
    </div>
  );
}
