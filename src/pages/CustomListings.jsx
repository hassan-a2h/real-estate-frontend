import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Listing from '../components/Listing';

function CustomListings() {
  const [filteredListings, setFilteredListings] = useState([]);
  const { type, value } = useParams();
  const userId = localStorage.getItem('userId');
  
  useEffect(() => {
    fetchListings(value);
  }, [ value ]);

  const fetchListings = async (value) => {
    try {
      let response;
      if (type === 'agent') {
        response = await axios.get('/api/listings', {
          params: { agentId: value }
        });
      } else {
        response = await axios.get('/api/listings', {
          params: { category: value }
        });
      }

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
    <Listing listings={filteredListings} handleDelete={handleDelete} userId={userId}/>
  );
}

export default CustomListings;