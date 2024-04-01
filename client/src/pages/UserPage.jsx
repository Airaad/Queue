import React from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'

export default function UserPage() {
  return (
    <div className='flex flex-col items-center'>
    <UserHeader/>
    <UserPost />
    </div>
  )
}
