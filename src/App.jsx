import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import CustomListings from './pages/CustomListings';
import ListingForm from './components/ListingForm';
import { ToastContainer } from 'react-toastify';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';
import SocialModal from './components/SocialModal';
import Chat from './pages/Chat/Chat';
import NotFound from './pages/404';
import ErrorBoundary from './pages/Error';
import io from 'socket.io-client';

export const socket = io(window.location.origin, {
  transports: ['websocket']
});

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const user = useContext(AuthContext)?.user?.id || localStorage.getItem('userId');

  useEffect(() => {
    if (user) {
      fetchUnreadMessages();
    }

    socket.on('receiveMessage', fetchUnreadMessages);

    // Listen for updates to unread count
    socket.on('unreadCountUpdated', ({ userId }) => {
    if (userId === user) {
        fetchUnreadMessages();
    }
    });

    return () => {
      socket.off('receiveMessage', fetchUnreadMessages);
    };
  }, [user]);

  const fetchUnreadMessages = async () => {
    try {
      const response = await axios.get(`/api/c/unread-messages/${user}`);
      setUnreadMessages(response.data);
      console.log('unread messages at the moment:', unreadMessages);
    } catch (error) {
      console.error('Error fetching unread messages:', error);
    }
  };

  console.log('unread messages at the moment:', unreadMessages);

  return (
    <Router>
      <ErrorBoundary>
      <AuthProvider>
          <Modal isOpen={isModalOpen}>
          <button onClick={() => setIsModalOpen(false)}>x</button>
          <div >
            <SocialModal  
            className="modal" 
            setIsModalOpen={setIsModalOpen}
            />
          </div>
        </Modal>

        <Navbar 
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        unreadMessages={unreadMessages?.unreadCount}
        />

        <ToastContainer />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/listings/new" element={<ListingForm />} />
            <Route path="/listings/edit/:id" element={<ListingForm editing />} />
            <Route path="/listings/:type/:value" element={<CustomListings />} />
            <Route path="/chat" element={<Chat unreadMessages={unreadMessages}/>} />
            <Route path="*" element={<NotFound />}/>
          </Route>
        </Routes>
      </AuthProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
