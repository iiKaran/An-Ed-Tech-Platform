import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import Banner from "../assets/Images/banner.mp4";
import HighLightText from "../components/core/HomePage/HighLightText";
import Button from "../components/core/HomePage/Button";
import CodeBlock from "../components/core/HomePage/CodeBlock";
import { TypeAnimation } from "react-type-animation";
import img from "../assets/Images/Instructor.png";
import Footer from "../components/core/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";
const code =
  "<!DOCTYPE html>\n <html lang='en'>\n<head>\n<meta charset='UTF-8'>\n</head>\n<body>\n</body>\n<!DOCTYPE html>\n <html lang='en'>\n<head>\n<meta charset='UTF-8'>\n</head>\n<body>\n</body>\n";
export default function Home() {
  return (
    <div>
      {/* // dark bg is section one */}
      <div className="section-  mx-auto w-11/12 flex flex-col items-center text-white ">
        <Link to={"/signup"}>
          <div className="group px-7 p-4 mt-6 shadow-md rounded-full font-bold bg-richblack-800 text-richblack-200 transition-all duration-200 hover:scale-95 ">
            <div className="">
              <p className="capitalize flex items-center gap-2">
                Become an instructor
                <span>
                  <AiOutlineArrowRight></AiOutlineArrowRight>
                </span>
              </p>
            </div>
          </div>
        </Link>

        <div className="head-container flex flex-col mt-8">
          <h1 className="text-[3vw] capitalize text-center">
            Empower Your Future with{" "}
            <HighLightText text=" coding skills"></HighLightText>
          </h1>
          <p className="lg:w-[70%] mx-auto lg:text-center text-sm p-4 leading-7 text-richblack-200">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </p>
          <div className="flex justify-center gap-3 mt-4">
            <Button
              children={"Learn more"}
              active={true}
              linkto={"/signup"}
            ></Button>
            <Button
              children={"Book a Demo"}
              active={false}
              linkto={"/login"}
            ></Button>
          </div>
        </div>

        <div className="video file lg:w-[80%] mx-auto m-9 mb-40 ">
          <video muted loop autoPlay className="rounded-lg">
            <source src={Banner} />
          </video>
        </div>

        <ExploreMore></ExploreMore>

        {/* code block components  */}
        <div className="w-[100%]">
          <CodeBlock
            heading="Unlock your coding potential with our "
            subheading="online courses."
            para="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            ctabtn1={{
              active: "true",
              linkto: "/signup",
              children: "Learn more",
            }}
            ctabtn2={{
              linkto: "/login",
              children: "try it yoursef",
            }}
            code={code}
            reverse={true}
          />
        </div>
        <div className="w-[100%] mt-14 mb-[20px]">
          <CodeBlock
            heading=" Start Coding with us "
            subheading=" In seconds "
            para="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            ctabtn1={{
              active: "true",
              linkto: "/signup",
              children: "Learn more",
            }}
            ctabtn2={{
              linkto: "/login",
              children: "try it yoursef",
            }}
            code={code}
            reverse={false}
          />
        </div>

        {/* invite to instructor */}
        <div className="flex flex-col lg:flex-row mx-auto my-4 gap-9 items-center justify-center">
          <div className="left-side">
            <img src={img} alt="teacher" />
          </div>
          <div className="right-side lg:w-[50%]">
            <h1 className="text-[2vw] p-4">
              Become An <HighLightText text="Instructor" />
            </h1>
            <p className=" text-sm p-4 leading-7 text-richblack-200 ">
              Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love. Start Teaching Today
            </p>
            <div className="w-[40%] mt-8 p-4">
              <Button
                active={true}
                linkto={"/signup"}
                children={"Start Journey"}
              />
            </div>
          </div>
        </div>
        {/* Scroller */}
      </div>

      <div className="text-white mt-14 ">
        <h1 className="text-center font-extrabold ">
          Review From Other learner
        </h1>
        <div className="review">review card will come here</div>
      </div>
      <span className="section-1 border ">
      {/* <iframe
        src="https://www.chatbase.co/chatbot-iframe/e5esUrQ1BuJ2UFeVwGMz0"
        // width="100%"
        style={{ height: "90%", minHeight: 700 }}
        // className="border !absolute"
        frameBorder={0}
      /> */}
      </span>

      {/* footer   the last footer one*/}
      <div className="">
        <Footer></Footer>
      </div>
    </div>
  );
}
