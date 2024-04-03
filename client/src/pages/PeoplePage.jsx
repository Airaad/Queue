import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import PeoplePageHeader from '../components/PeoplePageHeader';
import { Alert } from 'flowbite-react';
import { useSelector } from 'react-redux'

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
               setUser(data);
            } catch (error) {
                setErrorMessage(error.message);
            }
        };
        getUser();
    },[username]);
 
    if(!user){
        return <div><Alert color="failure">{errorMessage}</Alert></div>;
    } 
  return (
    <>
        <PeoplePageHeader user={user}/>
    </>
  )
}
