//In React Router DOM, useLocation is a custom hook that allows you to access the current location object in a functional component. The location object represents where the app is currently at in terms of the URL.
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashProfile from '../components/DashProfile';

export default function Dashboard() {
  const location = useLocation();
  const[tab, setTab] = useState("");

  useEffect(()=>{
    //In JavaScript, the URLSearchParams constructor is a built-in object used to handle query string parameters in a URL
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab"); //output will be value of tab
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* profile... */}
      {tab === 'profile' && <DashProfile />}
    </div>
  )
}
