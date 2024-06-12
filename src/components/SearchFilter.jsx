import { useState } from 'react';

const SearchFilter = ({ listings, setFilteredListings }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({ minPrice: '', maxPrice: '', location: '' });

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

  const handleSearchFilter = () => {
    const newListings = listings.filter((listing) => {
      const matchesSearchTerm = listing.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = (!filter.minPrice || listing.price >= filter.minPrice) && (!filter.maxPrice || listing.price <= filter.maxPrice);
      const matchesLocation = !filter.location || listing.location.toLowerCase().includes(filter.location.toLowerCase());
      return matchesSearchTerm && matchesPrice && matchesLocation;
    });

    setFilteredListings(newListings);
  };
  
  return (
    <div className="container-fluid bg-primary mb-5 wow fadeIn" data-wow-delay="0.1s" style={{"padding": "35" + "px"}}>
            <div className="container">
                <div className="row g-2">
                    <div className="col-md-10">
                        <div className="row g-2">
                            <div className="col-md-3">
                                <input
                                  type="text"
                                  placeholder="Search Keyword"
                                  value={searchTerm}
                                  onChange={handleSearch}
                                  className="form-control border-0 py-3"
                                />
                            </div>
                            <div className="col-md-3">
                              <input
                                type="number"
                                name="minPrice"
                                placeholder="Min Price"
                                value={filter.minPrice}
                                onChange={handleFilterChange}
                                className="form-control border-0 py-3"
                              />
                            </div>
                            <div className="col-md-3">
                              <input
                                type="number"
                                name="maxPrice"
                                placeholder="Max Price"
                                value={filter.maxPrice}
                                onChange={handleFilterChange}
                                className="form-control border-0 py-3"
                              />
                            </div>
                            <div className="col-md-3">
                              <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                value={filter.location}
                                onChange={handleFilterChange}
                                className="form-control border-0 py-3"
                              />
                            </div>
                            
                        </div>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-dark border-0 w-100 py-2" onClick={handleSearchFilter}>Search</button>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default SearchFilter;