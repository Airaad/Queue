import React, { useEffect, useState } from 'react'
import ActionPost from './ActionPost';

export default function FeedPost({post, postedBy}) {
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    useEffect(() => {
		const getUser = async () => {
			try {
				const res = await fetch("/api/user/profile/" + postedBy);
				const data = await res.json();
				if (data.error) {
					setErrorMessage(data.message);
					return;
				}
				setUser(data);
			} catch (error) {
				setErrorMessage(error);
				setUser(null);
			}
		};

		getUser();
	}, [postedBy]);

    if(!user){
        return null;
    }

    return (
      <div className=' mt-8 w-9/12 mx-auto md:w-1/2'>
          <div className=' flex justify-between items-center'>
          <div className='flex gap-3 items-center'>
              <div className='w-10 h-10 self-center'>
                <img src={user.profilePicture} alt='user' className="rounded-full w-full h-full object-cover border-2 border-[teal]"/>
              </div>
              <div>
                <span className='font-semibold'>{user.username}</span>
              </div>
            </div>
          </div>
  
          <div className='ml-13 mt-3'>
            <p>{post.text}</p>
            <div className='w-full  mt-2  overflow-hidden'>
            {post.img? <img src={post.img} alt='user' className="w-full h-full object-cover border-2"/>:null}
            </div>
          </div>
          <div>
          <ActionPost post={post}/>
          </div>
            
            <div className='h-[1px] w-full mx-auto bg-slate-500 my-5' />
                
        </div>
    )
  }
