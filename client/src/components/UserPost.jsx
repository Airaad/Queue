import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux';
import PostComponent from './PostComponent';

export default function UserPost() {
  const {currentUser} = useSelector(state => state.user);
  const[postData, setPostData] = useState(null);
  const[errorMessage, setErrorMessage] = useState(null);
  useEffect(()=>{
    try {
      const getPost = async()=>{
        try {
           const res = await fetch(`/api/post/getmypost/`);
           const data = await res.json();
           if (data.success === false) {
            setErrorMessage(data.message);
            return;
          }
          setPostData(data);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };
    getPost();
    } catch (error) {
      
    }
  },[currentUser._id]);

  if(!postData){
    return null;
  }
  return (
    
    <div className='w-full py-8'>
    <div className='flex justify-center'><h1 className='text-2xl font-semibold'>My Posts</h1></div>
    <div className='h-[1px] w-1/6 mx-auto bg-slate-500 my-5' />

    {postData.map((post)=>{
      return(
        <PostComponent key={post._id} user={currentUser} post={post}/>
      )
    })}
      
        
    </div>
  )
}
