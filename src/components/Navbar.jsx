import React, { useEffect } from 'react';
import logo from '../assets/img/icon-deal.png';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const UpdatedNavbar = ({ setIsModalOpen, isModalOpen, unreadMessages }) => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const user = useContext(AuthContext)?.user?.id;
  const role = useContext(AuthContext)?.user?.role || 'user';
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';


  console.log('currently logged in user:', user);
  console.log('unread messages', unreadMessages);

  return (
    <>
      { 
        (role === 'admin' ? 
            <AdminNavbar
            user={user}
            logout={logout}
            isLoginPage={isLoginPage}
            isRegisterPage={isRegisterPage} 
            unreadMessages={unreadMessages}
            /> : 
            role === 'agent' ?
            <AgentNavbar 
            user={user}
            logout={logout}
            isLoginPage={isLoginPage}
            isRegisterPage={isRegisterPage}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            unreadMessages={unreadMessages}
            /> :
            <UserNavbar 
            user={user}
            logout={logout}
            isLoginPage={isLoginPage}
            isRegisterPage={isRegisterPage}
            unreadMessages={unreadMessages}
            />) }
    </>
  );
};

function AdminNavbar({ user, logout, isLoginPage, isRegisterPage, unreadMessages }) {
    return (
    <div className="container-fluid nav-bar bg-transparent" style={{ zIndex: 1000 }}>
        <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4 flex justify-between">
          <Link to="/" className="navbar-brand d-flex align-items-center text-center">
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
                            <Link onClick={logout} className="nav-item nav-link active">
                            Sign Out
                            </Link>
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
                        <Link to='/register' className='nav-item nav-link'>Add Agent</Link>
                        <Link to="/chat" className="nav-item nav-link">
                            Chat {unreadMessages > 0 && <span className="badge badge-danger">{unreadMessages}</span>}
                        </Link>
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
                        <a href="#contact-us" className="nav-item nav-link">Contact</a>
                    </div>
                    <Link to="/listings/new"><a href="" className="btn btn-primary px-3 d-none d-lg-flex">Add Property</a></Link>
                </div>
      </nav>
    </div>
    );
}

function UserNavbar({ user, logout, isLoginPage, isRegisterPage, unreadMessages }) {
    return (
        <div className="container-fluid nav-bar bg-transparent" style={{ zIndex: 1000 }}>
      <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4 flex justify-between">
          <Link to="/" className="navbar-brand d-flex align-items-center text-center">
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
                            <Link onClick={logout} className="nav-item nav-link active">
                            Sign Out
                            </Link>
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
                        <Link to="/chat" className="nav-item nav-link">
                            Chat {unreadMessages > 0 && <span className="badge badge-danger">{unreadMessages}</span>}
                        </Link>
                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                            <div className="dropdown-menu rounded-0 m-0">
                                <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                                <a href="404.html" className="dropdown-item">404 Error</a>
                            </div>
                        </div>
                        <a href="#contact-us" className="nav-item nav-link">Contact</a>
                    </div>
                </div>
      </nav>
    </div>
    );
}

function AgentNavbar({ user, logout, isLoginPage, isRegisterPage, setIsModalOpen, isModalOpen, unreadMessages }) {
    const navigate = useNavigate();
    
    function handleCustomListing() {
        navigate(`/listings/agent/${user}`);
      }

    return (
    <div className="container-fluid nav-bar bg-transparent" style={{ zIndex: 1000 }}>
            
      <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4 flex justify-between">
          <Link to="/" className="navbar-brand d-flex align-items-center text-center">
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
                            <Link onClick={logout} className="nav-item nav-link active">
                            Sign Out
                            </Link>
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
                        <span className="nav-item nav-link active" style={{"cursor": "pointer"}} onClick={() => handleCustomListing()}>My Listings</span>
                        <Link to="/chat" className="nav-item nav-link">
                          Chat {unreadMessages > 0 && <span className="badge badge-danger">{unreadMessages}</span>}
                        </Link>
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
                        <a href="#" className="nav-item nav-link" onClick={() => setIsModalOpen(() => !isModalOpen)}>Socials</a>
                        <a href="#contact-us" className="nav-item nav-link">Contact</a>
                    </div>
                    <Link to="/listings/new"><a href="" className="btn btn-primary px-3 d-none d-lg-flex">Add Property</a></Link>
                </div>
      </nav>
    </div>
    );
}

export default UpdatedNavbar;