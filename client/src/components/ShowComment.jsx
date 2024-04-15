import React from 'react'

export default function ShowComment({comment}) {
  return (
    <div>
        <div className='flex items-center gap-2 text-gray-500'>
        <div className='w-10 h-10 self-center'>
                <img src={comment.userProfilePicture} alt='user' className="rounded-full w-full h-full object-cover border-2 border-[teal]"/>
        </div>
        <span>{comment.username}</span>  
        </div>

        <div className='my-4 ml-12'>
        <span className='text-gray-300'>{comment.text}</span>
        </div>

        <div className='h-[1px] w-full mx-auto bg-gray-500 my-5' />
    </div>
  )
}
