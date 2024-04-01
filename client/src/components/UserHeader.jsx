import React from 'react'

export default function UserHeader() {
  return (
    <div className='w-[30rem] flex flex-col gap-4 px-6 py-6 md:w-[45rem]'>
    <div className='flex justify-between items-center'>
        <div>
        <h1 className=' font-bold text-4xl mb-1'>Airaad</h1>
        <span className='font-medium'>airaad@gmail.com</span>
        </div>
        <div className='w-28 h-28 self-center cursor-pointer'>
        <img  alt='user' className="rounded-full w-full h-full object-cover border-2 border-[lightgray]"/>
        </div>
    </div>
    <div>
        <span>About me</span>
    </div>
    <div>
        <span className=' text-gray-500'>3.2K followers</span>
    </div>
    </div>
  )
}
