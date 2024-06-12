import logo from '../assets/img/icon-deal.png';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

const UpdatedNavbar = () => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const user = localStorage.getItem('token');
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  return (
    <div className="container-fluid nav-bar bg-transparent">
      <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4 flex justify-between">
          <Link to="/listings" className="navbar-brand d-flex align-items-center text-center">
              <div className="icon p-2 me-2">
                <img className="img-fluid" src={logo} alt="Icon" style={{"width": "30" + "px", "height": "30" + "px"}} />
              </div>
              <h1 className="m-0 text-primary">Makaan</h1>
          </Link>
          <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto">
                        {user ? (
                            <a onClick={logout} className="nav-item nav-link active">
                            Sign Out
                            </a>
                        ) : (
                            <>
                            {!isLoginPage && (
                                <Link to="/login" className="nav-item nav-link">
                                Login
                                </Link>
                            )}
                            {!isRegisterPage && (
                                <Link to="/register" className="nav-item nav-link">
                                Register
                                </Link>
                            )}
                            </>
                        )}
                        <a href="index.html" className="nav-item nav-link active">Home</a>
                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Property</a>
                            <div className="dropdown-menu rounded-0 m-0">
                                <a href="property-list.html" className="dropdown-item">Property List</a>
                                <a href="property-type.html" className="dropdown-item">Property Type</a>
                                <a href="property-agent.html" className="dropdown-item">Property Agent</a>
                            </div>
                        </div>
                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                            <div className="dropdown-menu rounded-0 m-0">
                                <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                                <a href="404.html" className="dropdown-item">404 Error</a>
                            </div>
                        </div>
                        <a href="contact.html" className="nav-item nav-link">Contact</a>
                    </div>
                    <Link to="/listings/new"><a href="" className="btn btn-primary px-3 d-none d-lg-flex">Add Property</a></Link>
                </div>
      </nav>
    </div>)
};

export default UpdatedNavbar;