import FooterComp from '../components/Footer';
import { IoIosInfinite } from "react-icons/io";

export default function About() {
  return (
    <>
    <div className='flex flex-col gap-10 w-[80%] mx-auto min-h-screen my-20'>
    
      <div className='text-center md:text-left'>
        <span className='text-3xl font-bold sm:text-4xl'>About Queue</span>
        <p className='text-gray-400'>Queue is a social networking platform which connects people from all walks of life, providing a space where individuals can express themselves, share their interests, and engage with others in a positive and supportive community.</p>
      </div>

      <IoIosInfinite className=" self-center text-6xl fill-customGreen mr-1 pt-1  h-20"/>

      <div className='text-center md:text-left'>
        <span className='text-3xl font-bold sm:text-4xl'>What we offer</span>
        <ul className='list-disc text-left text-gray-400'>
          <li>Profile Creation: Customize your profile to reflect your personality and interests.</li>
          <li>Connect with Friends: Stay in touch with friends and family, and make new connections with like-minded individuals.</li>
          <li>Privacy and Safety: We prioritize the privacy and safety of our users, implementing measures to ensure a secure and enjoyable experience for everyone.</li>
        </ul>
      </div>

      <IoIosInfinite className=" self-center text-6xl fill-customGreen mr-1 pt-1  h-20"/>

      <div className='text-center md:text-left'>
        <span className='text-3xl font-bold sm:text-4xl'>Team</span>
        <p className='text-gray-400'>Hello! I am Sheikh Airaad the creator of Queue. I am a passionate web developer with a knack for crafting dynamic and user-friendly websites.</p>
      </div>
    </div>
    <FooterComp/>
    </>
  )
}
