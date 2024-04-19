import React, { useEffect, useState } from 'react'
import FeedPost from '../components/FeedPost';
import {useSelector} from 'react-redux';


export default function FeedPage() {
    const {currentUser} = useSelector(state => state.user);
    const [posts, setPosts] = useState(null);
    useEffect(()=>{
        const getFeedPosts = async()=>{
            try {
                const res = await fetch('/api/post/feed');
                const data = await res.json();
    
                if(!data){

                    return;
                }
                setPosts(data);
            } catch (error) {
                console.log(error);
            }
        };
        getFeedPosts();
    },[currentUser]);

    if(!posts){
        return;
    }
    

  return (
   <div className='mt-24'>
    {posts.length !=0 ? posts.map((post)=>{
        return <FeedPost key={post._id} post = {post} postedBy = {post.postedBy}/>
    }): <section className='flex min-h-screen w-[70%] justify-center items-center text-center mx-auto'><h1 className='text-2xl'>No feed to fetch. Try by following someone with posts</h1></section>}
    </div>
   
  )
}
