import { Link } from 'react-router-dom';
import FooterComp from '../components/Footer';
import { IoIosInfinite } from "react-icons/io";

export default function Contact() {
  return (
    <>
    <div className='min-h-screen my-32 flex flex-col gap-10 mx-auto w-[80%]'>
    <IoIosInfinite className=" self-center text-6xl fill-customGreen mr-1 pt-1  h-20"/>
    <div className='text-center'>
        <span className='text-3xl font-bold sm:text-4xl'>Get in Touch</span>
        <p className='text-gray-400'>Have questions or feedback? We'd love to hear from you! Contact us at <Link to='mailto:sheikhairaad@gmail.com' className='text-blue-500'>sheikhairaad@gmail.com</Link> or reach out to us on social media.</p>
    </div>
    <div className='text-center'>
        <span className='text-3xl font-bold sm:text-4xl'>Social Media</span>
        <p><Link to='https://github.com/Airaad' className='text-blue-500'>GitHub</Link></p>
        <p><Link to='https://www.linkedin.com/in/sheikh-airaad-314889291' className='text-blue-500'>LinkedIn</Link></p>
    </div>
    </div>
    <FooterComp/>
    </>
  )
}
