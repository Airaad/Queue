import React, { useState } from 'react'
import{useSelector} from "react-redux"
import {TextInput ,Button, Modal,} from 'flowbite-react';

export default function ActionPost({post:post_}) {
    const {currentUser} = useSelector(state => state.user);
    const [liked, setLiked] = useState(post_.likes.includes(currentUser?._id));
    const [post, setPost] = useState(post_)
    const [openModal, setOpenModal] = useState(false);
    const [comment, setComment] = useState("");

    const handleLikeAndUnlike = async() =>{
        if(!currentUser){
            console.log("Login first to like the post");
        }
        try {
            const res = await fetch('/api/post/like/'+post._id,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if(data.success === false){
                console.log(data.mesaage);
            }

            if(!liked){
                setPost({...post, likes: [...post.likes,currentUser._id]});
            }else{
                setPost({...post, likes: post.likes.filter(id=> id!==currentUser._id)});
            }

            setLiked(!liked);
            
        } catch (error) {
            console.log(error);
        }
    };

    const handleComment = async()=>{
        if(!currentUser){
            console.log("No user");
        }
        try {
            const res = await fetch("/api/post/reply/" + post._id, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ text: comment }),
			});
			const data = await res.json();
           if(data.success === false){
            console.log(data.message);
           }
           setPost({...post, replies:[...post.replies, data.comment]})
           setOpenModal(false);
           setComment("");
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className='flex flex-col gap-4 mt-5'>
    <div className='flex gap-4'>
    <svg
              aria-label='Like'
              color={liked ? "rgb(237, 73, 86)" :""}
              fill={liked ? "rgb(237, 73, 86)" : "transparent"} 
              height='19'
              role='img'
              viewBox='0 0 24 22'
              width='20'
              onClick={handleLikeAndUnlike}
          >
              <path
                  d='M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z'
                  stroke='currentColor'
                  strokeWidth='2'
              ></path>
          </svg>
          <span className='text-gray-600'>{post.likes.length +" "+ "likes"}</span>

          <svg
              aria-label='Comment'
              color=''
              fill=''
              height='20'
              role='img'
              viewBox='0 0 24 24'
              width='20'
              onClick={() => setOpenModal(true)}
          >
              <title>Comment</title>
              <path
                  d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
                  fill='none'
                  stroke='currentColor'
                  strokeLinejoin='round'
                  strokeWidth='2'
              ></path>
          </svg>
          <span className='text-gray-600'>{post.replies.length+" "+ "comments"}</span>
        </div>

       
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Add comment</Modal.Header>
            
            <Modal.Body>
              <TextInput placeholder='comment...'  id='comment' autoComplete="off" shadow required onChange={(e)=>{setComment(e.target.value)}}/>   
            </Modal.Body>
            <Modal.Footer>
              <Button gradientMonochrome='teal' type='submit' onClick={handleComment}>Add</Button>
              
              {/* {
                saveError && <Alert className="mt-5" color='failure'>{saveError}</Alert>
              } */}
            </Modal.Footer>
           
          </Modal>
          

      </div>
      
  )
}
