import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Navbar from './components/UpdatedNavbar';
import Listings from './pages/Listings';
import CustomListings from './pages/CustomListings';
import ListingForm from './components/ListingForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
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
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
