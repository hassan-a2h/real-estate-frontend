import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const user = localStorage.getItem('token');
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Real Estate App
        </Link>
        <div>
          {user ? (
            <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded mr-4">
              Sign Out
            </button>
          ) : (
            <>
              {!isLoginPage && (
                <Link to="/login" className="mr-4">
                  Login
                </Link>
              )}
              {!isRegisterPage && (
                <Link to="/register" className="mr-4">
                  Register
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
