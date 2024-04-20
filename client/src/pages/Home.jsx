import FooterComp from '../components/Footer';
import { IoIosInfinite } from "react-icons/io";
import { Button, Carousel } from "flowbite-react";
import { Link } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdOutlineDynamicFeed } from "react-icons/md";


export default function Home() {
  return (
    <>
    <div className='min-h-screen my-20 flex flex-col items-center'>
    
    <IoIosInfinite className=" self-center text-6xl fill-customGreen mr-1 pt-1  h-20"/>
      <div className='flex flex-col gap-3 text-center'>
        <p className='text-4xl font-bold whitespace-nowrap sm:text-5xl'>Welcome to Queue</p>
        <span>Your Social Connection Destination.</span>
      </div>
      
     <Link to='/sign-up'> <Button className='my-10' gradientMonochrome="cyan" pill>Get Started</Button> </Link>

     <div className='h-[1px] w-1/2 mx-auto bg-slate-500 my-5' />

    <div className='my-5'>
     <div className='flex flex-col gap-16 p-10 w-[80%] text-center mx-auto md:flex-row md:justify-between'>
      <div className='flex flex-col gap-4 md:w-[80%]'>
        <FaUserAlt className='mx-auto text-4xl'/>
        <span className='text-2xl font-semibold'>User Profile</span>
        <p className='text-gray-300'>Every user gets their own profile where they can add information about themselves, such as a profile picture, bio, interests, and contact details.</p>
      </div>

      <div className='flex flex-col gap-4 md:w-[80%]'>
      <MdOutlineDynamicFeed className='mx-auto text-5xl'/>
        <span className='text-2xl font-semibold'>Feed</span>
        <p className='text-gray-300'>A central feed where users can see updates from their friends, users they follow. Users can like, comment on posts.</p>
      </div>

      <div className='flex flex-col gap-4 md:w-[80%]'>
      <FaSearch className='mx-auto text-4xl'/>
        <span className='text-2xl font-semibold'>Search</span>
        <p className='text-gray-300'>A search bar that enables users to find other users and connect to them.</p>
      </div>
     </div>
     </div>

     <div className='h-[1px] w-1/2 mx-auto bg-slate-500 my-5' />

    <div className='my-5 text-center'>
      <p className='text-lg sm:text-2xl'>Connecting People, Sharing Moments</p>
    </div>
    <div className="h-72 sm:h-[30rem] w-[90%]">
      <Carousel slideInterval={5000}>
        <img className='w-full h-full object-scale-down' src='/images/img2.jpg' />
        <img className='w-full h-full object-scale-down' src='/images/img3.jpg' />
        <img className='w-full h-full object-scale-down' src='/images/img4.jpg' />
        <img className='w-full h-full object-scale-down' src='/images/img5.jpg' />
        <img className='w-full h-full object-scale-down' src='/images/img6.jpg' />
        
      </Carousel>
    </div>
    

    </div>
    <FooterComp/>
    </>
  )
}
