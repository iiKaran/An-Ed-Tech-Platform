import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto my-14 bg-richblack-800 lg:w-[50vw] py-14 px-12'>
      <h1 className='font-bold text-xl '>
        Get in Touch
      </h1>
      <p className='text-richblack-300 py-4'>
        We'd love to here for you, Please fill out this form.
      </p>
      <div>
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactFormSection
