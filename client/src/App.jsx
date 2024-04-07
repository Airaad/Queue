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

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />

        <Route element={<PrivateRoute/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userpage" element={<UserPage/>} />
        <Route path="/:username" element={<PeoplePage/>} />
        <Route path="/feed" element={<FeedPage/>} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}


