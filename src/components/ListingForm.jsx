import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ListingForm = ({ editing }) => {
  const [listing, setListing] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    images: '',
    status: ''
  });
  const [listingErrors, setListingErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editing && id) {
      fetchListing(id);
    }
  }, [editing, id]);

  const fetchListing = async (id) => {
    try {
      const response = await axios.get(`/api/listings/${id}`);
      setListing(response.data);
    } catch (error) {
      console.error('Error fetching listing:', error);
      toast.error('Error fetching listing.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListing({ ...listing, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await axios.put(`/api/listings/${id}`, listing);
        toast.success('Listing updated successfully.');
      } else {
        await axios.post('/api/listings', listing);
        toast.success('Listing created successfully.');
      }
      navigate('/listings');
    } catch (error) {
      console.error('Error saving listing:', error);
      const errors = error.response.data.errors;

        if (errors) {
          setListingErrors(errors);
          Object.values(errors).forEach((errorMessage) => {
            toast.error(errorMessage);
          });
        }
      toast.error('Error saving listing.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">{editing ? 'Edit Listing' : 'Add Listing'}</h2>
      <input
        type="text"
        name="title"
        value={listing.title}
        onChange={handleChange}
        placeholder="Title"
        minLength={8}
        maxLength={64}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <textarea
        name="description"
        value={listing.description}
        onChange={handleChange}
        placeholder="Description & Contact details"
        minLength={4}
        maxLength={512}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <input
        type="number"
        name="price"
        value={listing.price}
        onChange={handleChange}
        placeholder="Price"
        min={1000}
        max={50000000}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <input
        type="text"
        name="location"
        value={listing.location}
        onChange={handleChange}
        placeholder="Location"
        minLength={8}
        maxLength={128}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <select
        name="status"
        value={listing.status}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
        required
      >
        <option value="">Select Status</option>
        <option value="available">Available</option>
        <option value="sold">Sold</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {editing ? 'Update Listing' : 'Add Listing'}
      </button>
    </form>
  );
};

export default ListingForm;
