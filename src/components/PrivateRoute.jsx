import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const user = localStorage.getItem('token');
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
