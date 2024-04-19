import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import UserPage from "./pages/UserPage";
import PeoplePage from "./pages/PeoplePage";
import FeedPage from "./pages/FeedPage";
import PostPage from "./pages/PostPage";
import Contact from "./pages/Contact";
import Followers from "./pages/Followers";
import Following from "./pages/Following";

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />

        <Route element={<PrivateRoute/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userpage" element={<UserPage/>} />
        <Route path="/:username" element={<PeoplePage/>} />
        <Route path="/feed" element={<FeedPage/>} />
        <Route path="/:username/post/:pid" element={<PostPage/>}/>
        <Route path="/followers" element={<Followers/>} />
        <Route path="/following" element={<Following/>} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}


