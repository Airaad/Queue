import React from 'react'
import {Dropdown} from "flowbite-react";
import { SlOptions } from "react-icons/sl";

export default function PostComponent({user, post}) {
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
            <div>
              <Dropdown
              arrowIcon={false}
              inline
              label = <SlOptions/>
              >
              <Dropdown.Item>Delete Post</Dropdown.Item>
              </Dropdown>
            </div>
        </div>

        <div className='ml-14 mt-2'>
          <p>{post.text}</p>
          <div className='w-full  mt-5  overflow-hidden'>
          {post.img? <img src={post.img} alt='user' className="w-full h-full object-cover border-2"/>:null}
          </div>
        </div>
      </div>
  )
}
