import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
//with the help of outlet we will be rendering child route of the private route 
export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
}