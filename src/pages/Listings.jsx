import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import SearchFilter from '../components/SearchFilter';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import Listing from '../components/Listing';
import Categories from '../components/Categories';
import About from '../components/About';
import ContactUs from '../components/ContactUs';
import AboutTeam from '../components/AboutTeam';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import 'react-toastify/dist/ReactToastify.css';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await axios.get('/api/listings');
      setListings(response.data);
      setFilteredListings(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast.error('Error fetching listings.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/listings/${id}`);
      fetchListings();
      toast.success('Listing deleted successfully.');
    } catch (error) {
      console.error('Error deleting listing:', error);
      toast.error('Error deleting listing.');
    }
  };

  return (
    <div className="container bg-white p-0">
      <ToastContainer />
      <Header />
      <SearchFilter 
        listings={listings}
        setFilteredListings={setFilteredListings}
      />
      <Listing 
        listings={filteredListings} 
        handleDelete={handleDelete}
      />
      <Categories />
      <About />
      <ContactUs/>
      <AboutTeam />
      <Testimonials />
      <Footer />
      {/* <div className='flex justify-center'>
        <Link to="/listings/new" className="bg-blue-500 text-white p-3 px-20 rounded mt-3">
          <button>Add New Listing</button>
        </Link>
      </div> */}
      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
    </div>
  );
};

export default Listings;
