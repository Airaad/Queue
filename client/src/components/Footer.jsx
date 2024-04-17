import { Footer } from 'flowbite-react'
import React from 'react'
import {BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import { IoIosInfinite } from "react-icons/io";

export default function FooterComp() {
    const currentYear = new Date().getFullYear();
  return (
    <Footer container className='border border-t-4 border-customGreen bg-transparent'>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className='flex items-center gap-1 mb-5'>
          <IoIosInfinite className=" self-center text-5xl fill-customGreen pt-1  h-12"/>
          <h1 className='text-2xl font-semibold'>Queue</h1>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link href="/about">Queue</Footer.Link>
                <Footer.Link href="/about">Team</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://github.com/Airaad">Github</Footer.Link>
                <Footer.Link href="https://www.linkedin.com/in/sheikh-airaad-314889291">LinkedIn</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="/" by="Queue™" year={currentYear} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="https://github.com/Airaad" icon={BsGithub} />
            <Footer.Icon href="https://www.linkedin.com/in/sheikh-airaad-314889291" icon={BsLinkedin} />
          </div>
        </div>
      </div>
    </Footer>
  );
}

  