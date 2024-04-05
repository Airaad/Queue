import { Button } from 'flowbite-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export default function UserHeader({user}) {
    // console.log(user); //user whos profile we are checking
    const {currentUser} = useSelector(state => state.user); //user that is logged in
    const [following, setFollowing] = useState(user.followers.includes(currentUser._id));

    const handleClick = async ()=>{
      try {
        const res = await fetch(`/api/user/follow/${user._id}`,{
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
          },
        });
        const data = await res.json();
        if(data.success === false){
          console.log(data.message);
          return;
        }
        
        if(following){
          user.followers.pop();
        }else{
          user.followers.push(currentUser._id);
        }
        setFollowing(!following);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className='w-full'>
    <div className='py-12  mt-12 w-9/12 mx-auto md:w-1/2 lg:1/4'>
    <div className='flex justify-between items-center'>
        <div>
        <h1 className=' font-bold text-4xl mb-1'>{user.name}</h1>
        <span className='font-medium'>{user.username}</span>
        </div>
        <div className='w-28 h-28 self-center'>
        <img src={user.profilePicture} alt='user' className="rounded-full w-full h-full object-cover border-2 border-[lightgray]"/>
        </div>
    </div>
    <div className='mt-2'>
        <span className='font-thin'>{user.bio}</span>
    </div>

    <div className='flex justify-center gap-32 mt-8'>
        <span className=' text-gray-500'>{user.followers.length+" "+ "followers"}</span>
        <span className=' text-gray-500'>{user.following.length+" "+ "following"}</span>
    </div>

    <div className='h-[1px] bg-slate-500 my-5' />

    <div className='py-2 mt-3 flex justify-center'>
        <Button pill gradientMonochrome="teal" size="sm" onClick={handleClick}>{following?"Unfollow": "Follow"}</Button>
    </div>
    
    </div>
    </div>
  )
}
