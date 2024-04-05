import { Avatar, Button, Dropdown, Navbar,} from "flowbite-react";
import { Link, useLocation } from "react-router-dom"; // it will take the user to the link address without refreshing the page
// import { CiSearch } from "react-icons/ci";
import { IoIosInfinite } from "react-icons/io";
import {useDispatch, useSelector} from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

export default function Header() {
    const path = useLocation().pathname;
    const {currentUser} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const handleSignOut = async () => {
      try {
        const res = await fetch('/api/user/signout', {
          method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signoutSuccess());
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  return (
    <Navbar fluid rounded className="mb-4">
      <Navbar.Brand href="/">
        <IoIosInfinite className="text-4xl fill-customGreen mr-1 pt-1  h-9" />
        <span className="self-center whitespace-nowrap text-2xl font-semibold">Queue</span>
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
          <Link to={"/dashboard"}>
            <Dropdown.Item>Edit Profile</Dropdown.Item>
          </Link>
          <Link to={"/userpage"}>
            <Dropdown.Item>My Profile</Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
          
          </Dropdown>
        ) :(<Link to="/sign-in"><Button gradientMonochrome="cyan">Sign in</Button></Link>)
      }
        
        <Navbar.Toggle className="ml-2"/>
      </div>
      <Navbar.Collapse>
        <Navbar.Link className="text-white-base " active={path === "/"} as={'div'}><Link to="/">Home</Link></Navbar.Link>
        <Navbar.Link className="text-white-base" active={path === "/about"} as={'div'}><Link to="/about">About</Link></Navbar.Link>
        <Navbar.Link className="text-white-base" active={path === "/contact"} as={'div'}><Link to="/contact">Contact</Link></Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
