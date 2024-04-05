import React, { useEffect, useState } from 'react'
import { Button } from "flowbite-react";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { updateSuccess } from '../redux/user/userSlice';
import CreatePost from './CreatePost';
import { Link } from 'react-router-dom';

export default function UserHeader() {
  const {currentUser} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(()=>{
    const getUser = async()=>{
        try {
           const res = await fetch(`/api/user/profile/${currentUser.username}`);
           const data = await res.json();
           if (data.success === false) {
            return setErrorMessage(data.message);
          }
           dispatch(updateSuccess(data));
        } catch (error) {
            setErrorMessage(error.message);
        }
    };
    getUser();
},[currentUser.username]);


if(!currentUser){
    return null;
}

  return (
    <div className='w-full'>
    <div className='py-12  mt-12 w-9/12 mx-auto md:w-1/2 lg:1/4'>
    <div className='flex justify-between items-center'>
        <div>
        <h1 className=' font-bold text-4xl mb-1'>{currentUser.name}</h1>
        <span className='font-medium'>{currentUser.username}</span>
        </div>
        <Link to='/dashboard'><div className='w-28 h-28 self-center cursor-pointer'>
        <img src={currentUser.profilePicture} alt='user' className="rounded-full w-full h-full object-cover border-2 border-[teal]"/>
        </div>
        </Link>
    </div>
    <div className=' mt-2'>
        <span className='font-thin'>{currentUser.bio}</span>
    </div>

    <div className='flex justify-center gap-32 mt-8'>
        <span className=' text-gray-500'>{currentUser.followers.length +" "+ "followers"}</span>
        <span className=' text-gray-500'>{currentUser.following.length +" "+ "following"}</span>
    </div>

    <div className='h-[1px] bg-slate-500 my-5' />

    <div className='py-2 mt-3 flex justify-center'>
      <CreatePost/>
    </div>
    
    </div>
    
    </div>
  )
}
