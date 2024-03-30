import { Button } from 'flowbite-react';
import React from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

export default function OAuth() {
    const auth = getAuth(app);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    async function handleAuthClick(){
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt: "select_account"});
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            //console.log(resultsFromGoogle);
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
                })
            const data = await res.json()
            if (res.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            }
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <Button type='button' gradientMonochrome="teal" outline onClick={handleAuthClick}><AiFillGoogleCircle className='w-6 h-6 mr-2' />Contine with Google</Button>
  )
}
