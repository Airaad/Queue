import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import { Alert, Button, FileInput, Modal, Textarea } from 'flowbite-react';
import { IoIosAdd } from "react-icons/io";
import { useState } from "react";
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
    const {currentUser} = useSelector(state => state.user);
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const[file, setFile] = useState(null);
    const[saveError, setSaveError] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({postedBy: currentUser._id});
    const handleUploadImage = async()=>{
        try {
            if(!file){
                setImageUploadError("Please select an image");
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + "-" + file.name
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot)=>{
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error)=>{
                    setImageUploadError("Image upload failed");
                    setImageUploadProgress(null);

                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({...formData, img: downloadURL});
                    })
                }
            );
;        } catch (error) {
            setImageUploadError("Image upload failed");
            setImageUploadProgress(null);
        }
    };

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try {
            const res = await fetch('/api/post/create',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if(!res.ok){
                setSaveError(data.message);
                return;
            }else{
                setOpenModal(false)
                setSaveError(null);
                window.location.reload();
                
            }
           
            
        } catch (error) {
            setSaveError("Something went wrong");
        }
    };
    return (
        <>
        
          <Button gradientMonochrome="teal" size="sm" pill onClick={() => setOpenModal(true)}>Add Post<IoIosAdd /></Button>
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>New Post</Modal.Header>
            <form onSubmit={handleSubmit}>
            <Modal.Body>
              <Textarea placeholder='Text content....' rows={4}  id='content' autoComplete="off" shadow required onChange={(e)=>{setFormData({...formData, text: e.target.value})}}/>
              <div className='flex gap-4 items-center justify-between mt-3'>
                <FileInput type='file' accept='image/*' onChange={(e)=>setFile(e.target.files[0])} />
                <Button type='button' size='sm' outline onClick={handleUploadImage} disabled={imageUploadProgress}>
                {
                    imageUploadProgress ? (
                        <div className="w-16 h-16">
                        <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`}/>
                        </div>) : ("Upload")
                }</Button>
              </div>
              {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
              {formData.img && (<img src={formData.img} alt="upload" className="w-full h-72  object-scale-down"/>)}
            </Modal.Body>
            <Modal.Footer>
              <Button gradientMonochrome='teal' type='submit'>Save</Button>
              
              {
                saveError && <Alert className="mt-5" color='failure'>{saveError}</Alert>
              }
            </Modal.Footer>
            </form>
          </Modal>
          
        </>
      );
}
