import { Avatar, Button, Dropdown, Navbar,} from "flowbite-react";
import { Link, useLocation } from "react-router-dom"; // it will take the user to the link address without refreshing the page
// import { CiSearch } from "react-icons/ci";
import { IoIosInfinite } from "react-icons/io";
import {useSelector} from "react-redux";

export default function Header() {
    const path = useLocation().pathname;
    const {currentUser} = useSelector(state => state.user);
  return (
    <Navbar fluid rounded className="mb-4">
      <Navbar.Brand href="/">
        <IoIosInfinite className="text-4xl fill-customGreen mr-1 pt-1  h-9" />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">Queue</span>
      </Navbar.Brand>
      
      <div className="flex md:order-2">
      {
        currentUser ? (
          <Dropdown
          arrowIcon={false}
          inline
          label ={
            <Avatar alt="user" rounded img={currentUser.profilePicture} />
          }
          >
          <Dropdown.Header>
            <span className="block text-sm">@{currentUser.username}</span>
            <span className="block text-sm font-medium truncate">{currentUser.email}</span>
          </Dropdown.Header>
          <Link to={"/dashboard?tab=profile"}>
            <Dropdown.Item>My Profile</Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
          
          </Dropdown>
        ) :(<Link to="/sign-in"><Button gradientMonochrome="teal">Sign in</Button></Link>)
      }
        
        <Navbar.Toggle className="ml-2"/>
      </div>
      <Navbar.Collapse>
        <Navbar.Link className="text-base" active={path === "/"} as={'div'}><Link to="/">Home</Link></Navbar.Link>
        <Navbar.Link className="text-base" active={path === "/about"} as={'div'}><Link to="/about">About</Link></Navbar.Link>
        <Navbar.Link className="text-base" active={path === "/contact"} as={'div'}><Link to="/contact">Contact</Link></Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
