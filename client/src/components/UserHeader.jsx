import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { updateSuccess } from '../redux/user/userSlice';
import CreatePost from './CreatePost';

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

console.log(currentUser);
  return (
    <div className='w-full'>
    <div className='py-12  mt-12 w-9/12 mx-auto md:w-1/2'>
    <div className='flex justify-between items-center'>
        <div>
        <h1 className=' font-bold text-4xl mb-1'>{currentUser.name}</h1>
        <span className='font-medium'>{currentUser.username}</span>
        </div>
        <div className='w-28 h-28 self-center'>
        <img src={currentUser.profilePicture} alt='user' className="rounded-full w-full h-full object-cover border-2 border-[lightgray]"/>
        </div>
    </div>
    <div className='py-2 mt-2'>
        <span>{currentUser.bio}</span>
    </div>
    <div className='py-2 mt-3'>
      <CreatePost/>
    </div>
    <div className='flex justify-around mt-8'>
        <span className=' text-gray-500'>{currentUser.followers.length +" "+ "followers"}</span>
        <span className=' text-gray-500'>{currentUser.following.length +" "+ "following"}</span>
    </div>
    </div>
    </div>
  )
}
