import FooterComp from '../components/Footer';
import { IoIosInfinite } from "react-icons/io";
import { Button, Carousel } from "flowbite-react";
import { Link } from 'react-router-dom';

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


    <div className='my-5 text-center'>
      <p className='text-lg sm:text-2xl'>Connecting People, Sharing Moments</p>
    </div>
    <div className="h-72 sm:h-[30rem] w-[90%]">
      <Carousel slideInterval={5000}>
        <img className='w-full h-full object-scale-down' src='src/assets/img2.jpg' />
        <img className='w-full h-full object-scale-down' src='src/assets/img3.jpg' />
        <img className='w-full h-full object-scale-down' src='src/assets/img4.jpg' />
        <img className='w-full h-full object-scale-down' src='src/assets/img5.jpg' />
        <img className='w-full h-full object-scale-down' src='src/assets/img6.jpg' />
        
      </Carousel>
    </div>
    

    </div>
    <FooterComp/>
    </>
  )
}
