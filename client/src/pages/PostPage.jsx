import React, { useEffect, useState } from 'react'
import ActionPost from '../components/ActionPost';
import { Link, useParams } from 'react-router-dom';
import ShowComment from '../components/ShowComment';

export default function PostPage() {
    const[user, setUser] = useState(null);
    const[post, setPost] = useState(null);
    const{username} = useParams();
    const{pid} = useParams();
    const [toValue, setToValue] = useState(username);
    useEffect(()=>{
        const getUser = async()=>{
            try {
                const res = await fetch(`/api/user/profile/${username}`);
                const data = await res.json();
                if (data.success === false) {
                    console.log(data.message);
                 return;
               }
                setUser(data);
             } catch (error) {
                 console.log(error);
             }
        };
        getUser();
    },[username]);

    useEffect(()=>{
        const getPost = async ()=>{
            try {
                const res = await fetch('/api/post/getpost/'+ pid);
                const data = await res.json();
                if(data.success === false){
                    console.log(data.messgae);
                    return;
                }
                setPost(data);
            } catch (error) {
                console.log(error);
            }
        }
        getPost();
    },[pid])

    if(!post || !user){
        return null;
    }
    console.log(post, user);
    
  return (
    <div className='w-full mx-auto p-10'>
      <div className=' border-solid border-2 border-gray-500 p-10 my-10'>
      <Link to={toValue}>
          <div className=' flex justify-between items-center'>
          <div className='flex gap-3 items-center'>
              <div className='w-14 h-14 self-center'>
                <img src={user.profilePicture} alt='user' className="rounded-full w-full h-full object-cover border-2 border-[teal]"/>
              </div>
              <div>
                <span className='font-semibold'>{user.username}</span>
              </div>
            </div>
          </div>
          </Link>
  
          <div className='ml-13 mt-3'>
            <p>{post.text}</p>
            <div className='w-full  mt-2  overflow-hidden'>
            {post.img? <img src={post.img} alt='user' className="w-full h-full object-cover border-2 border-gray-500 rounded-md"/>:null}
            </div>
          </div>
          <div className='my-10'>
          
          </div>
            
            <div>
            {post.replies.length !=0 ? (
                post.replies.map((comment)=>{
                    return <ShowComment key={comment._id} comment={comment}/>
                })
            ): null }
                
            </div>
            
                
        </div>
        </div>
  )
}
