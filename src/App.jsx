import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Navbar from './components/UpdatedNavbar';
import Listings from './pages/Listings';
import CustomListings from './pages/CustomListings';
import ListingForm from './components/ListingForm';
import { ToastContainer } from 'react-toastify';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';
import SocialModal from './components/SocialModal';
import Chat from './pages/Chat';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Router>
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
        />
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/listings/new" element={<ListingForm />} />
            <Route path="/listings/edit/:id" element={<ListingForm editing />} />
            <Route path="/listings/:type/:value" element={<CustomListings />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
