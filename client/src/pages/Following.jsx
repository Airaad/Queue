import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { updateSuccess } from '../redux/user/userSlice';
import FollowingComp from '../components/FollowingComp';
export default function Following() {
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
    <span className='font-semibold text-4xl underline'>Following List</span>
    </div>
    {currentUser.following.map((following)=>{
      return <FollowingComp key = {following} following = {following} /> 
    })}
    </div>
  )
}
