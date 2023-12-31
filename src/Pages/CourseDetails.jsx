import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseDetialsApiCall } from "../services/operations/CourseApi";
import RatingStars from "../components/core/common/RatingStar";
import Button from "../components/core/HomePage/Button";
import "react-accessible-accordion/dist/fancy-example.css";
import { IoIosArrowDown } from "react-icons/io";
import Footer from "../components/core/common/Footer";
// import 'react-accessible-accordion/dist/fancy-example.css';
import ReactPlayer from "react-player";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";
import { addToCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function CourseDetails() {
  const [isEnrolled, setisEnrolled] = useState(false);
  const dispatch = useDispatch();
  async function addCartHandler() {
    // add the course details to the cart global states
    dispatch(addToCart(course));
  }
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const {user}= useSelector((state)=>state.profile )
  const navigate = useNavigate();
  function totalLecture() {
    let lecture = 0;

    course?.courseContent?.forEach((section) => {
      lecture += section?.subSections?.length;
    });

    return lecture;
  }
  async function FetchCourseDetails() {
    const result = await getCourseDetialsApiCall(courseId);
    console.log("the result is", result[0]);
    setCourse(result[0]);
  }
  useEffect(() => {
    if (courseId) FetchCourseDetails();
  }, [courseId, isEnrolled]);
  const avgReviewCount = 4.5;
  return (
    <div className=" box-content px-4">
      <div className="flex relative  gap-8 ">
        <div className=" mt-12 px-12 min-h-[260px] max-w-maxContentTab flex-col justify-center  lg:max-w-maxContent w-[60%]">
          <p className="text-sm mb-4 text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25  ">
              {course?.category[0]?.name}
            </span>
          </p>
          <p className="text-3xl mb-4 text-richblack-5 capitalize">
            {course?.courseName}
          </p>
          <p className="max-w-[870px] mb-4 capitalize text-richblack-200">
            {course?.courseDescription}
          </p>
          <p className="max-w-[870px]  mb-4 flex gap-3 capitalize text-richblack-200">
            <span>4.5</span>
            <RatingStars Review_Count={avgReviewCount} />
            <span>{course?.studentsEnrolled.length} Student Enrolled</span>
          </p>
          <div className="font-bold p-4 text-richblack-25 text-[30px]">
            Course Content
          </div>
          <p className="text-richblack-25 mb-12 text-sm flex items-center gap-2 px-4">
            <span>{course?.courseContent.length} Sections</span>
            <span className="dot font-[30px]">.</span>
            <span>{totalLecture() + " "}Lectures</span>
          </p>

          <div className="content">
            <Accordion allowMultipleExpanded>
              {course?.courseContent?.map((item, index) => (
                <div className="!rounded-lg">
                  <AccordionItem
                    key={index}
                    className=" "
                    backgroundColor="red"
                  >
                    <AccordionItemHeading className=" ">
                      <AccordionItemButton color="white">
                        <span className="flex items-center gap-2 ">
                          <IoIosArrowDown /> {item.sectionName}
                        </span>

                        <span className="text-yellow-25 text-sm mx-12 ">
                          {item.subSections.length + "-"}Lectures
                        </span>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      {item?.subSections.map((subSection, index) => {
                        return (
                          <AccordionItem key={index}>
                            <AccordionItemHeading>
                              <AccordionItemButton className=" text-white">
                                {/* {item.heading} */}
                                <span className="flex items-center gap-2 ">
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
                                  Lecture-{subSection.title} <IoIosArrowDown />{" "}
                                </span>
                              </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                              <div className=" text-white flex flex-col gap-2">
                                <p className=" flex flex-col gap-4">
                                  <span className="font-semibold text-[23px] text-yellow-5">
                                    Lecture Description{" "}
                                  </span>
                                  <span className="text-sm text-richblack-25">
                                    {subSection.description}
                                  </span>
                                </p>
                                {isEnrolled && (
                                  <div className=" flex justify-center p-12 mt-14 mb-8 bg-[#161D29] rounded-lg">
                                    <ReactPlayer
                                      url={subSection.videoUrl}
                                      controls={true}
                                      className="w-[100%]"
                                    />
                                  </div>
                                )}
                              </div>
                            </AccordionItemPanel>
                          </AccordionItem>
                        );
                      })}
                    </AccordionItemPanel>
                  </AccordionItem>
                </div>
              ))}
            </Accordion>
          </div>
        </div>

  <div className="text-white flex flex-col w-[30%]  rounded-lg absolute right-[10%] top-20 bg-richblack-800">
          <img
            src={course?.thumbnail}
            alt="laoding"
            className="w-[100%] rounded-lg "
          />
          <div className="price font-bold p-4 text-[30px]">
            Rs. {course?.price}
          </div>
          {   user?.accountType === "student" &&    <div className="btns">
            {token ? (
              <button
                className=" w-[100%] text-center"
                onClick={addCartHandler}
              >
                <Button active={true} classes=" w-[90%] mx-auto ">
                  Add to Cart
                </Button>{" "}
                
              </button>
            ) : (
              <button
                className=" w-[100%] text-center"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <Button active={true} classes=" w-[90%] mx-auto ">
                  Login to get Enroll
                </Button>
              </button>
            )}
            <button className=" w-[100%] text-center">
              <Button
                active={false}
                classes=" my-3 w-[90%] mx-auto !bg-richblack-300 "
              >
                Avail Now
              </Button>
            </button>
          </div>
}
          <p className="capitalize text-center text-sm text-richblack-25">
            30-days-money-Back-gurrantee
          </p>

          <div className="offerings mt-2 p-6">
            <p className="p-2 text-md text-richblack-25">
              This Course Includes :
            </p>
            <p className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <g clipPath="url(#clip0_11167_19126)">
                  <path
                    d="M7 0C5.61553 0 4.26216 0.410543 3.11101 1.17971C1.95987 1.94888 1.06266 3.04213 0.532846 4.32122C0.003033 5.6003 -0.13559 7.00777 0.134506 8.36563C0.404603 9.7235 1.07129 10.9708 2.05026 11.9497C3.02922 12.9287 4.2765 13.5954 5.63437 13.8655C6.99224 14.1356 8.3997 13.997 9.67879 13.4672C10.9579 12.9373 12.0511 12.0401 12.8203 10.889C13.5895 9.73785 14 8.38447 14 7C13.998 5.1441 13.2599 3.36479 11.9475 2.05247C10.6352 0.74015 8.8559 0.0020073 7 0V0ZM7 12.25C5.96165 12.25 4.94662 11.9421 4.08326 11.3652C3.2199 10.7883 2.547 9.9684 2.14964 9.00909C1.75228 8.04978 1.64831 6.99418 1.85088 5.97578C2.05345 4.95738 2.55347 4.02192 3.28769 3.28769C4.02192 2.55346 4.95738 2.05345 5.97578 1.85088C6.99418 1.6483 8.04978 1.75227 9.00909 2.14963C9.9684 2.54699 10.7883 3.2199 11.3652 4.08326C11.9421 4.94661 12.25 5.96165 12.25 7C12.2485 8.39191 11.6948 9.72637 10.7106 10.7106C9.72638 11.6948 8.39192 12.2485 7 12.25Z"
                    fill="#06D6A0"
                  />
                  <path
                    d="M6.12318 6.44877L4.72318 7.32377C4.62575 7.38476 4.5413 7.46436 4.47464 7.558C4.40799 7.65164 4.36044 7.7575 4.33471 7.86953C4.30898 7.98155 4.30557 8.09755 4.32468 8.2109C4.34379 8.32424 4.38505 8.43271 4.44609 8.5301C4.50709 8.62752 4.58668 8.71198 4.68033 8.77863C4.77397 8.84529 4.87983 8.89284 4.99185 8.91857C5.10388 8.9443 5.21988 8.94771 5.33322 8.9286C5.44657 8.90948 5.55503 8.86823 5.65243 8.80718L7.32601 7.75719C7.49393 7.65196 7.63227 7.50571 7.728 7.3322C7.82373 7.1587 7.8737 6.96368 7.87318 6.76552V4.53369C7.87318 4.30163 7.78099 4.07907 7.61689 3.91497C7.4528 3.75088 7.23024 3.65869 6.99818 3.65869C6.76611 3.65869 6.54355 3.75088 6.37946 3.91497C6.21536 4.07907 6.12318 4.30163 6.12318 4.53369V6.44877Z"
                    fill="#44E4BF"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_11167_19126">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="text-caribbeangreen-50 ">8 hours on-demand video</p>
            </p>
            <p className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <g clipPath="url(#clip0_11167_19129)">
                  <path
                    d="M11.9681 6.35847L5.6372 0.494799C5.35056 0.240908 4.99667 0.0752287 4.6181 0.0176866C4.23954 -0.0398555 3.85241 0.0131895 3.50327 0.170442C3.15413 0.327695 2.85786 0.58246 2.65008 0.904098C2.44229 1.22574 2.33185 1.60055 2.33203 1.98347V10.7918C2.33201 10.9621 2.38167 11.1286 2.47491 11.2711C2.56815 11.4136 2.70094 11.5257 2.85698 11.5938C3.01303 11.662 3.18556 11.6831 3.35342 11.6546C3.52129 11.6261 3.67719 11.5492 3.80203 11.4335L5.94403 9.45013L7.64853 13.1893C7.82807 13.5412 8.14005 13.8073 8.51582 13.9292C8.70189 13.9895 8.89802 14.0127 9.09301 13.9972C9.288 13.9817 9.47804 13.928 9.65228 13.8391C9.82652 13.7502 9.98154 13.6279 10.1085 13.4791C10.2354 13.3303 10.3318 13.1579 10.3922 12.9718C10.4525 12.7858 10.4756 12.5896 10.4602 12.3947C10.4447 12.1997 10.391 12.0096 10.3021 11.8354L8.66295 8.26538L11.495 7.86813C11.659 7.84515 11.813 7.77613 11.9393 7.6691C12.0656 7.56206 12.1589 7.4214 12.2085 7.26344C12.258 7.10548 12.2617 6.93671 12.2192 6.77673C12.1766 6.61675 12.0896 6.47212 11.9681 6.35963V6.35847ZM6.45095 6.80705C6.27389 6.8318 6.10873 6.91041 5.97786 7.03222L4.08203 8.78805V1.98347C4.08016 1.93735 4.09261 1.89178 4.11768 1.85303C4.14274 1.81428 4.1792 1.78424 4.22203 1.76705C4.25581 1.75111 4.2926 1.74255 4.32995 1.74197C4.3789 1.74165 4.42617 1.75977 4.46236 1.79272L9.42653 6.38997L6.45095 6.80705Z"
                    fill="#06D6A0"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_11167_19129">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="text-caribbeangreen-50 ">Full LifeTime Access</p>
            </p>
            <p className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <g clipPath="url(#clip0_11167_19132)">
                  <path
                    d="M9.6263 0H4.3763C3.52568 0.000926432 2.71017 0.339244 2.10869 0.940722C1.50721 1.5422 1.1689 2.35771 1.16797 3.20833V10.7917C1.1689 11.6423 1.50721 12.4578 2.10869 13.0593C2.71017 13.6608 3.52568 13.9991 4.3763 14H9.6263C10.4769 13.9991 11.2924 13.6608 11.8939 13.0593C12.4954 12.4578 12.8337 11.6423 12.8346 10.7917V3.20833C12.8337 2.35771 12.4954 1.5422 11.8939 0.940722C11.2924 0.339244 10.4769 0.000926432 9.6263 0V0ZM11.0846 10.7917C11.0846 11.1784 10.931 11.5494 10.6575 11.8229C10.384 12.0964 10.0131 12.25 9.6263 12.25H7.8763V11.9583C7.8763 11.7263 7.78411 11.5037 7.62002 11.3396C7.45593 11.1755 7.23337 11.0833 7.0013 11.0833C6.76924 11.0833 6.54668 11.1755 6.38258 11.3396C6.21849 11.5037 6.1263 11.7263 6.1263 11.9583V12.25H4.3763C3.98953 12.25 3.6186 12.0964 3.3451 11.8229C3.07161 11.5494 2.91797 11.1784 2.91797 10.7917V3.20833C2.91797 2.82156 3.07161 2.45063 3.3451 2.17714C3.6186 1.90365 3.98953 1.75 4.3763 1.75H9.6263C10.0131 1.75 10.384 1.90365 10.6575 2.17714C10.931 2.45063 11.0846 2.82156 11.0846 3.20833V10.7917ZM9.33463 9.625C9.33463 9.85706 9.24245 10.0796 9.07835 10.2437C8.91426 10.4078 8.6917 10.5 8.45964 10.5H5.54297C5.3109 10.5 5.08834 10.4078 4.92425 10.2437C4.76016 10.0796 4.66797 9.85706 4.66797 9.625C4.66797 9.39293 4.76016 9.17038 4.92425 9.00628C5.08834 8.84219 5.3109 8.75 5.54297 8.75H8.45964C8.6917 8.75 8.91426 8.84219 9.07835 9.00628C9.24245 9.17038 9.33463 9.39293 9.33463 9.625ZM7.0013 2.33333C6.38246 2.33333 5.78897 2.57917 5.35139 3.01675C4.9138 3.45434 4.66797 4.04783 4.66797 4.66667V6.70833C4.67028 6.91297 4.74426 7.11033 4.87702 7.26607C5.00979 7.42182 5.19295 7.5261 5.39464 7.56078C5.59633 7.59546 5.8038 7.55834 5.98096 7.45588C6.15812 7.35343 6.29377 7.19211 6.3643 7H7.6383C7.70884 7.19211 7.84448 7.35343 8.02164 7.45588C8.1988 7.55834 8.40627 7.59546 8.60796 7.56078C8.80966 7.5261 8.99281 7.42182 9.12558 7.26607C9.25834 7.11033 9.33232 6.91297 9.33463 6.70833V4.66667C9.33463 4.04783 9.0888 3.45434 8.65122 3.01675C8.21363 2.57917 7.62014 2.33333 7.0013 2.33333ZM7.0013 4.08333C7.15601 4.08333 7.30438 4.14479 7.41378 4.25419C7.52318 4.36358 7.58464 4.51196 7.58464 4.66667V5.25H6.41797V4.66667C6.41797 4.51196 6.47943 4.36358 6.58882 4.25419C6.69822 4.14479 6.84659 4.08333 7.0013 4.08333Z"
                    fill="#06D6A0"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_11167_19132">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="text-caribbeangreen-50 ">Access on Mobile and TV</p>
            </p>
            <p className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <g clipPath="url(#clip0_11167_19135)">
                  <path
                    d="M11.8949 2.48968L10.345 0.939763C10.0478 0.640852 9.69426 0.403877 9.30484 0.242566C8.91543 0.0812536 8.49789 -0.00118903 8.07639 1.29564e-05H4.3763C3.52568 0.000939389 2.71017 0.339257 2.10869 0.940735C1.50721 1.54221 1.1689 2.35773 1.16797 3.20835V10.7917C1.1689 11.6423 1.50721 12.4578 2.10869 13.0593C2.71017 13.6608 3.52568 13.9991 4.3763 14H9.6263C10.4769 13.9991 11.2924 13.6608 11.8939 13.0593C12.4954 12.4578 12.8337 11.6423 12.8346 10.7917V4.75826C12.8358 4.33677 12.7533 3.91924 12.592 3.52984C12.4307 3.14044 12.1937 2.7869 11.8949 2.48968ZM9.6263 12.25H4.3763C3.98953 12.25 3.6186 12.0964 3.3451 11.8229C3.07161 11.5494 2.91797 11.1785 2.91797 10.7917V3.20835C2.91797 2.82157 3.07161 2.45064 3.3451 2.17715C3.6186 1.90366 3.98953 1.75001 4.3763 1.75001H7.58464V4.08335C7.58464 4.39277 7.70755 4.68951 7.92634 4.9083C8.14514 5.1271 8.44188 5.25001 8.7513 5.25001H11.0846V10.7917C11.0846 11.1785 10.931 11.5494 10.6575 11.8229C10.384 12.0964 10.0131 12.25 9.6263 12.25ZM9.96814 6.68851C10.128 6.85656 10.2147 7.08123 10.209 7.31313C10.2033 7.54502 10.1057 7.76517 9.9378 7.92518L7.84597 9.91668C7.46182 10.2929 6.94477 10.5024 6.4071 10.4996C5.86942 10.4969 5.35453 10.2822 4.97422 9.9021L4.08464 9.11168C3.99884 9.03507 3.92897 8.94232 3.87902 8.83871C3.82907 8.73511 3.80001 8.62268 3.79351 8.50784C3.78701 8.39301 3.8032 8.27802 3.84114 8.16944C3.87908 8.06085 3.93803 7.96081 4.01464 7.87501C4.09124 7.78922 4.18399 7.71935 4.2876 7.6694C4.39121 7.61945 4.50364 7.59039 4.61847 7.58389C4.73331 7.57739 4.8483 7.59357 4.95688 7.63151C5.06546 7.66945 5.16551 7.72841 5.2513 7.80501L6.17647 8.62985C6.20642 8.66526 6.24329 8.69419 6.28482 8.71485C6.32635 8.73551 6.37165 8.74748 6.41797 8.75001C6.49517 8.75 6.56922 8.71937 6.62389 8.66485L8.73147 6.65818C8.89952 6.49828 9.12418 6.41165 9.35608 6.41734C9.58798 6.42303 9.80813 6.52057 9.96814 6.68851Z"
                    fill="#06D6A0"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_11167_19135">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="text-caribbeangreen-50 ">
                Certificate of completion
              </p>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-[120px]">
        <Footer></Footer>
      </div>
    </div>
  );
}
