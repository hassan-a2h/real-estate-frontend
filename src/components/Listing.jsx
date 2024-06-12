import propertyImg from '../assets/img/property-1.jpg';
import { Link } from 'react-router-dom';

const Listing = ({ listings, handleDelete }) => {
  return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="row g-0 gx-5 align-items-end">
                    <div className="col-lg-6">
                        <div className="text-start mx-auto mb-5 wow slideInLeft" data-wow-delay="0.1s">
                            <h1 className="mb-3">Property Listing</h1>
                            <p>Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit diam justo sed rebum.</p>
                        </div>
                    </div>
                    <div className="col-lg-6 text-start text-lg-end wow slideInRight" data-wow-delay="0.1s">
                        <ul className="nav nav-pills d-inline-flex justify-content-end mb-5">
                            <li className="nav-item me-2">
                                <a className="btn btn-outline-primary active" data-bs-toggle="pill" href="">Featured</a>
                            </li>
                            <li className="nav-item me-2">
                                <a className="btn btn-outline-primary" data-bs-toggle="pill" href="">For Sell</a>
                            </li>
                            <li className="nav-item me-0">
                                <a className="btn btn-outline-primary" data-bs-toggle="pill" href="">For Rent</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="tab-content">
                    <div id="tab-1" className="tab-pane fade show p-0 active">
                        <div className="row g-4">
                              { listings.map((listing) => (
                                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s"  key={listing._id}>
                                <div className="property-item rounded overflow-hidden">
                                  <div className="position-relative overflow-hidden">
                                      <a href=""><img className="img-fluid" src={propertyImg} alt="" /></a>
                                      <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Sale</div>
                                      <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{listing.status}</div>
                                  </div>
                                  <div className="p-4 pb-0">
                                      <h5 className="text-primary mb-3">${listing.price}</h5>
                                      <a className="d-block h5 mb-2" href="">{listing.title.slice(0, 22)}</a>
                                      <p><i className="fa fa-map-marker-alt text-primary me-2"></i>{listing.description}</p>
                                  </div>
                                  <div className="d-flex border-top">
                                      <small className="flex-fill text-center border-end py-2"><i className="fa fa-ruler-combined text-primary me-2"></i>1000 Sqft</small>
                                      <small className="flex-fill text-center border-end py-2"><Link to={`/listings/edit/${listing._id}`} className="bg-yellow-500 text-black p-2 rounded">Edit</Link></small>
                                      <span className="flex-fill text-center py-2 cursor-pointer" onClick={() => handleDelete(listing._id)}><Link className="bg-yellow-500 text-black p-2 rounded">Delete</Link></span>
                                  </div>
                                </div>
                                </div>
                              ))}
                                
                            </div>
                        
                    </div>
                </div>
            </div>
        </div>
  );
};

export default Listing;