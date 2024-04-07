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
    
    console.log(posts);
  return (
   <div>
    { posts.length !=0 ? posts.map((post)=>{
        return <FeedPost key={post._id} post = {post} postedBy = {post.postedBy}/>
    }): <section className='flex min-h-screen w-full justify-center items-center'><h1 className='text-2xl'>Follow someone to see their posts</h1></section>}
    </div>
   
  )
}
