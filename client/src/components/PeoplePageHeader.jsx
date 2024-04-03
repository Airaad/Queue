import React from 'react'

export default function UserHeader({user}) {
    console.log(user);
  return (
    <div className='w-full'>
    <div className='py-12  mt-12 w-9/12 mx-auto md:w-1/2'>
    <div className='flex justify-between items-center'>
        <div>
        <h1 className=' font-bold text-4xl mb-1'>{user.name}</h1>
        <span className='font-medium'>{user.username}</span>
        </div>
        <div className='w-28 h-28 self-center'>
        <img src={user.profilePicture} alt='user' className="rounded-full w-full h-full object-cover border-2 border-[lightgray]"/>
        </div>
    </div>
    <div className='py-2 mt-3'>
        <span>{user.bio}</span>
    </div>
    <div className='flex justify-around mt-8'>
        <span className=' text-gray-500'>{user.followers.length+" "+ "followers"}</span>
        <span className=' text-gray-500'>{user.following.length+" "+ "following"}</span>
    </div>
    </div>
    </div>
  )
}
