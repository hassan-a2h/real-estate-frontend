import apartmentIcon from '../assets/img/icon-apartment.png';
import villaIcon from '../assets/img/icon-villa.png';
import houseIcon from '../assets/img/icon-house.png';
import housingIcon from '../assets/img/icon-housing.png';
import buildingIcon from '../assets/img/icon-building.png';
import neighborhoodIcon from '../assets/img/icon-neighborhood.png';
import condoIcon from '../assets/img/icon-condominium.png';
import luxuryIcon from '../assets/img/icon-luxury.png';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
    const navigate = useNavigate();

    function handleClick(category) {
        navigate(`/listings/category/${category}`);
    }

  return (
    <div className="container-xxl py-5" id='property-categories'>
    <div className="container">
        <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{'maxWidth': '600' + "px"}}>
            <h1 className="mb-3">Property Types</h1>
            <p>Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
        </div>
        <div className="row g-4">
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s"
            onClick={ () => handleClick('apartment') }>
                <a className="cat-item d-block bg-light text-center rounded p-3" href="">
                    <div className="rounded p-4">
                        <div className="icon mb-3">
                            <img className="img-fluid" src={apartmentIcon} alt="Icon" />
                        </div>
                        <h6>Apartment</h6>
                    </div>
                </a>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s"
            onClick={ () => handleClick('villa') }>
                <a className="cat-item d-block bg-light text-center rounded p-3" href="">
                    <div className="rounded p-4">
                        <div className="icon mb-3">
                            <img className="img-fluid" src={villaIcon} alt="Icon" />
                        </div>
                        <h6>Villa</h6>
                    </div>
                </a>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s"
                onClick={ () => handleClick('home') }>
                <a className="cat-item d-block bg-light text-center rounded p-3" href="">
                    <div className="rounded p-4">
                        <div className="icon mb-3">
                            <img className="img-fluid" src={houseIcon} alt="Icon" />
                        </div>
                        <h6>Home</h6>
                    </div>
                </a>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s"
            onClick={ () => handleClick('office') }>
                <a className="cat-item d-block bg-light text-center rounded p-3" href="">
                    <div className="rounded p-4">
                        <div className="icon mb-3">
                            <img className="img-fluid" src={housingIcon} alt="Icon" />
                        </div>
                        <h6>Office</h6>
                    </div>
                </a>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s"
            onClick={ () => handleClick('building') }>
                <a className="cat-item d-block bg-light text-center rounded p-3" href="">
                    <div className="rounded p-4">
                        <div className="icon mb-3">
                            <img className="img-fluid" src={buildingIcon} alt="Icon" />
                        </div>
                        <h6>Building</h6>
                    </div>
                </a>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s"
            onClick={ () => handleClick('townhouse') }>
                <a className="cat-item d-block bg-light text-center rounded p-3" href="">
                    <div className="rounded p-4">
                        <div className="icon mb-3">
                            <img className="img-fluid" src={neighborhoodIcon} alt="Icon" />
                        </div>
                        <h6>Townhouse</h6>
                    </div>
                </a>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s"
            onClick={ () => handleClick('shop') }>
                <a className="cat-item d-block bg-light text-center rounded p-3" href="">
                    <div className="rounded p-4">
                        <div className="icon mb-3">
                            <img className="img-fluid" src={condoIcon} alt="Icon" />
                        </div>
                        <h6>Shop</h6>
                    </div>
                </a>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s"
            onClick={ () => handleClick('garage') }>
                <a className="cat-item d-block bg-light text-center rounded p-3" href="">
                    <div className="rounded p-4">
                        <div className="icon mb-3">
                            <img className="img-fluid" src={luxuryIcon} alt="Icon" />
                        </div>
                        <h6>Garage</h6>
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>
  );
};

export default Categories;