//In React Router DOM, useLocation is a custom hook that allows you to access the current location object in a functional component. The location object represents where the app is currently at in terms of the URL.

import DashProfile from '../components/DashProfile';

export default function Dashboard() {
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <DashProfile />
    </div>
  )
}
