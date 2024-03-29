import { Button, Navbar,} from "flowbite-react";
import { Link, useLocation } from "react-router-dom"; // it will take the user to the link address without refreshing the page
// import { CiSearch } from "react-icons/ci";
import { IoIosInfinite } from "react-icons/io";

export default function Header() {
    const path = useLocation().pathname;
  return (
    <Navbar fluid rounded className="mb-4">
      <Navbar.Brand href="/">
        <IoIosInfinite className="text-4xl fill-customGreen mr-1 pt-1  h-9" />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">Queue</span>
      </Navbar.Brand>
      
      <div className="flex md:order-2">
        <Button>Sign in</Button>
        <Navbar.Toggle className="ml-1"/>
      </div>
      <Navbar.Collapse>
        <Navbar.Link className="text-base" active={path === "/"} as={'div'}><Link to="/">Home</Link></Navbar.Link>
        <Navbar.Link className="text-base" active={path === "/about"} as={'div'}><Link to="/about">About</Link></Navbar.Link>
        <Navbar.Link className="text-base" active={path === "/contact"} as={'div'}><Link to="/contact">Contact</Link></Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
