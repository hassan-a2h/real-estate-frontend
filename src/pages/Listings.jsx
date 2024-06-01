import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({ minPrice: '', maxPrice: '', location: '' });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await axios.get('/api/listings');
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast.error('Error fetching listings.');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
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

  const filteredListings = listings.filter((listing) => {
    const matchesSearchTerm = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) || listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = (!filter.minPrice || listing.price >= filter.minPrice) && (!filter.maxPrice || listing.price <= filter.maxPrice);
    const matchesLocation = !filter.location || listing.location.toLowerCase().includes(filter.location.toLowerCase());
    return matchesSearchTerm && matchesPrice && matchesLocation;
  });

  return (
    <div className="container mx-auto px-4">
      <ToastContainer />
      <div className='flex justify-center'>
        <Link to="/listings/new" className="bg-blue-500 text-white p-3 px-20 rounded mt-3">
          <button>Add New Listing</button>
        </Link>
      </div>

{/* tailwindcss styling for filters div such that there are two fields on each line, use grid */}
      <div className='bg-slate-200 border-sky-100 shadow-lg p-5 my-3'>
      <h2>Filter By</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or location"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border rounded mb-2"
        />
        <div className="flex space-x-4">
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filter.minPrice}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filter.maxPrice}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filter.location}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
        </div>

      </div>
      </div>
      <ul className='grid grid-cols-3 gap-3'>
        {filteredListings.map((listing) => (
          <li key={listing._id} className="border p-2 rounded-md">
            <h3 className="text-xl font-bold">{listing.title}</h3>
            <p><span className='font-bold underline'>Description </span>{listing.description}</p>
            <p>Price: <span className='underline'>PKR</span>{listing.price}</p>
            <p>Location: {listing.location}</p>
            <p>Status: {listing.status}</p>
            <div className="flex space-x-4">
              <Link to={`/listings/edit/${listing._id}`} className="bg-yellow-500 text-white p-2 rounded">
                Edit
              </Link>
              <button onClick={() => handleDelete(listing._id)} className="bg-red-500 text-white p-2 rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Listings;
