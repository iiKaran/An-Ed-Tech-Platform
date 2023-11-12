import React from 'react'
import HighLightText from '../components/core/HomePage/HighLightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/AboutPage/Stats'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import  ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/core/common/Footer'

const About = () => {
  return (
    <div className='mx-auto mt-[100px] text-white '>
      {/* section 1 */}
      <section className=' bg-richblack-800 p-12'>
        <div>
            <header className='mb-14 bg-richblack-800'>
                <h1 className='text-[3vw] lg:w-[80vw] mx-auto text-center'>
                Driving Innovation in Online Education for a 
                <br></br>
                <HighLightText text={"Brighter Future"}/>
                </h1>
                <p className='lg:w-[60vw] mx-auto text-center font-medium text-lg text-richblack-200'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
            </header>
            <div className='flex gap-x-3 mx-auto items-center justify-center mb-14 flex-wrap'>
                <img src={BannerImage1} className='rounded-lg' />
                <img src={BannerImage2} className='rounded-lg'/>
                <img src={BannerImage3}  className='rounded-lg'/>
            </div>
        </div>
      </section>

      {/* section 2 */}

      <section>
        <div>
            <Quote/>
        </div>
      </section>


      {/* section 3 */}

      
      {/* section 4 */}
      <StatsComponent/>  
      
      {/* section 5 */}
      <section className='mx-auto flex flex-col  items-center justify-between gap-x-14 mb-[140px]'>
        <LearningGrid />
        <ContactFormSection />
      </section>

      <section>
        <div>
            Reviews from other learners
            {/* <ReviewSlider /> */}
        </div>
      </section>

      <Footer/>

    </div>
  )
}

export default About
