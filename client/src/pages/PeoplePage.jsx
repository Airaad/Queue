import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import PeoplePageHeader from '../components/PeoplePageHeader';
import { Alert } from 'flowbite-react';
import { useSelector } from 'react-redux'
import PeoplePagePost from '../components/PeoplePagePost';

export default function PeoplePage() {
    const {currentUser} = useSelector(state => state.user);
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const{username} = useParams();
    
    if(username === currentUser.username){
      return  <Navigate to="/userpage" />
    }

    useEffect(()=>{
        const getUser = async()=>{
            try {
               const res = await fetch(`/api/user/profile/${username}`);
               const data = await res.json();
               if (data.success === false) {
                return setErrorMessage(data.message);
              }
                setErrorMessage(null);
               setUser(data);
            } catch (error) {
                setErrorMessage(error.message);
            }
        };
        getUser();
    },[username]);
 
    if(!user){
        return <div className='w-1/2 mx-auto mt-80'><Alert color="failure"><span>{errorMessage}</span></Alert></div>;
    } 
  return (
    <>
        <PeoplePageHeader user={user}/>
        <PeoplePagePost user={user}/>
    </>
  )
}
