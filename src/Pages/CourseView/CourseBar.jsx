import React, { useEffect, useState } from "react";
import { getCourseDetialsApiCall } from "../../services/operations/CourseApi";
import "react-accessible-accordion/dist/fancy-example.css";
import { IoIosArrowDown } from "react-icons/io";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { useParams } from "react-router-dom";
export default function CourseBar() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [section, setSection] = useState(null);
  const [lecture, setLecture] = useState(null);

  async function FetchCourseDetails() {
    const result = await getCourseDetialsApiCall(courseId);
    console.log("the result is", result[0]);
    setCourse(result[0]);
    setLecture(result[0]?.courseContent[0]?.subSections[0]);
  }
  useEffect(() => {
    FetchCourseDetails();
  }, [courseId]);

  return (
    <div className="main-side-div border-b-2">
      <div className="flex seciton-1">
        <span> / </span>
        <span>Add Review</span>
      </div>
      <div className="courseName">
        <span>{course?.courseName}</span>
        <span>3/5</span>
      </div>

      <div className="flex flex-col  gap-4 py-12  capitalize sticky  min-h-[100%]">
        <Accordion>
          {course?.courseContent?.map((item, index) => (
            <div className="!rounded-lg" key={index}>
              <AccordionItem className=" " backgroundColor="red">
                <AccordionItemHeading className=" ">
                  <AccordionItemButton color="white">
                    <span
                      className={`flex items-center gap-2 ${
                        item?._id === section?._id
                          ? "!text-yellow-25"
                          : "text-richblack-200"
                      } `}
                    >
                      <IoIosArrowDown />
                      {item?.sectionName}
                    </span>

                    <span className="text-yellow-25 text-sm mx-12 ">
                      {item?.subSections?.length + "-"}Lectures
                    </span>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {item?.subSections?.map((subSection, index) => {
                    return (
                      <div key={index}>
                        <div>
                          <div className={``}>
                            {item.heading}
                            <span
                              className={`flex  cursor-pointer items-center gap-2 ${
                                subSection?._id === lecture?._id
                                  ? "text-yellow-25 "
                                  : "text-richblack-400"
                              }`}
                              onClick={() => {setLecture(subSection)}}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                              >
                                <path
                                  d="M14.625 4.5H3.375V11.25H14.625V4.5Z"
                                  fill="#C5C7D4"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M2.53125 2.25C1.7546 2.25 1.125 2.8796 1.125 3.65625V12.0938C1.125 12.8704 1.7546 13.5 2.53125 13.5H7.3125V14.625H4.5C4.18934 14.625 3.9375 14.8768 3.9375 15.1875C3.9375 15.4982 4.18934 15.75 4.5 15.75H13.5C13.8107 15.75 14.0625 15.4982 14.0625 15.1875C14.0625 14.8768 13.8107 14.625 13.5 14.625H10.6875V13.5H15.4688C16.2454 13.5 16.875 12.8704 16.875 12.0938V3.65625C16.875 2.8796 16.2454 2.25 15.4688 2.25H2.53125ZM2.53125 12.375H15.4688C15.6241 12.375 15.75 12.2491 15.75 12.0938V3.65625C15.75 3.50092 15.6241 3.375 15.4688 3.375H2.53125C2.37592 3.375 2.25 3.50092 2.25 3.65625V12.0938C2.25 12.2491 2.37592 12.375 2.53125 12.375Z"
                                  fill="#C5C7D4"
                                />
                              </svg>
                              {subSection?.title}{" "}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </AccordionItemPanel>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
