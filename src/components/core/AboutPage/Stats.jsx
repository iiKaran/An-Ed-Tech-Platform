import React from 'react'


const Stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
];

const StatsComponent = () => {
  return (
    <section className='  text-center bg-richblack-800 mt-14 mb-14 py-12 '>
        <div>
            <div className='flex  flex-col lg:flex-row flex-wrap gap-x-5 gap-y-5  items-center justify-center p-8 '>
                {
                    Stats.map( (data, index) => {
                        return (
                            <div key={index} className='w-[20%] '>
                                <h1 className='text-[2.5rem] mb-5'>
                                    {data.count}
                                </h1>
                                <h2 className='text-richblack-400'>
                                    {data.label}
                                </h2>
                            </div>
                        )
                    } )
                }
            </div>
        </div>
    </section>
  )
}

export default StatsComponent
