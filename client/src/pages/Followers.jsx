import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { updateSuccess } from '../redux/user/userSlice';
import FollowerComp from '../components/FollowerComp';
export default function Followers() {
    const {currentUser} = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(()=>{
        const getUser = async()=>{
            try {
               const res = await fetch(`/api/user/profile/${currentUser.username}`);
               const data = await res.json();
               if (data.success === false) {
                return;
              }
               dispatch(updateSuccess(data));
            } catch (error) {
                console.log(error);;
            }
        };
        getUser();
    },[currentUser.username]);

    if(!currentUser){
        return null;
    }

  return (
    <div className='my-20'>
    <div className='my-10 text-center'>
    <span className='font-semibold text-4xl underline'>My Followers</span>
    </div>
    {currentUser.followers.map((follower)=>{
      return <FollowerComp key = {follower} follower = {follower} /> 
    })}
    </div>
  )
}
