import React, { useState } from 'react'
import {Dropdown, Modal, Button} from "flowbite-react";
import { SlOptions } from "react-icons/sl";
import ActionPost from './ActionPost';
import {useSelector} from "react-redux";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

export default function PostComponent({user, post}) {
  const {currentUser} = useSelector(state => state.user);
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState(`/${user.username}/post/${post._id}`);

  const handleDelete = async(event)=>{
   
    try {
      const res = await fetch('/api/post/deletepost/'+post._id,{
        method: 'DELETE',
        headers:{
          "Content-Type" : "application/json",
        }
      });
      const data = await res.json();
      if(data.success === false){
        console.log(data.message);
      }
      console.log(data);
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=' mt-8 w-10/12 mx-auto md:w-1/2'>
        <div className=' flex justify-between items-center'>
        <div className='flex gap-3 items-center'>
            <div className='w-10 h-10 self-center'>
              <img src={user.profilePicture} alt='user' className="rounded-full w-full h-full object-cover border-2 border-[teal]"/>
            </div>
            <div>
              <span className='font-semibold'>{user.username}</span>
            </div>
          </div>
          {currentUser._id===user._id ? (
            <div>
              <Dropdown
              arrowIcon={false}
              inline
              label = <SlOptions/>
              >
              <Dropdown.Item onClick={()=>setShowModal(true)}> <MdDelete /> Delete</Dropdown.Item>
              </Dropdown>
            </div>
          ): null}
            
        </div>

       <Link to={address}> <div className='ml-14 mt-2'>
          <p>{post.text}</p>
          <div className='w-full  mt-5  overflow-hidden'>
          {post.img? <img src={post.img} alt='user' className="w-full h-full object-cover border-2 rounded-md"/>:null}
          </div>
        </div>
        </Link>
        <div className='my-4 ml-14'>
          <span className='font-thin text-gray-500'>{post.createdAt.slice(0,10)}</span>
        </div>
        <div className=' ml-14'>
        <ActionPost post={post}/>
        </div>

        <Modal show={showModal} onClose={()=>setShowModal(false)} popup size="md">
          <Modal.Header/>
          <Modal.Body>
          <div className='text-center'>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this post?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
        </Modal>
        
      </div>
      
  )
}
