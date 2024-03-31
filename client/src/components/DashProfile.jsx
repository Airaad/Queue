import { Alert, Button, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function () {
    const {currentUser} = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const filePickerRef = useRef(); //used to create the reference so that when user clicks on the image it will open the file tab
    function handleImageChange(event){
        const file = event.target.files[0];
        if(file){
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    }
    useEffect(()=>{
        if (imageFile){
            uploadImage();
        }
    },[imageFile]);

    const uploadImage = async () => {
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    
            setImageFileUploadProgress(progress.toFixed(0));
          },
          (error) => {
            setImageFileUploadError(
              'Could not upload image (File must be less than 2MB)'
            );
            setImageFileUploadProgress(null);
            setImageFile(null);
            setImageFileUrl(null);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageFileUrl(downloadURL);
            });
          }
        );
      };
  return (
    <div className='mx-w-lg mx-auto my-12 w-[26rem]'>
        <h1 className='text-3xl font-semibold my-7 text-center'>My Profile</h1>
        <form className='flex flex-col gap-4'>
            <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
            <div className='relative w-28 h-28 self-center cursor-pointer' onClick={()=>{filePickerRef.current.click()}}>
            {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
                <img src={imageFileUrl || currentUser.profilePicture} alt='user' className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}/>
            </div>
            {imageFileUploadError && <Alert color="failure">{imageFileUploadError}</Alert>}
            <TextInput id='username' type='text' placeholder='username' defaultValue={currentUser.username}/>
            <TextInput id='email' type='email' placeholder='email' defaultValue={currentUser.email}/>
            <TextInput id='password' type='password' placeholder='password'/>
            <Button gradientMonochrome="teal">Update</Button>
        </form>
        
        <div className='text-red-500 flex justify-between mt-3'>
            <span className='cursor-pointer'>Sign Out</span>
            <span className='cursor-pointer'>Delete Account</span>
        </div>
    </div>
  )
}
