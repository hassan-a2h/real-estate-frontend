import property1 from '../assets/img/property-1.jpg';
import property2 from '../assets/img/property-2.jpg';
import property3 from '../assets/img/property-3.jpg';
import property4 from '../assets/img/property-4.jpg';
import property5 from '../assets/img/property-5.jpg';
import property6 from '../assets/img/property-6.jpg';

const Footer = () => {
  return (
    <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
    <div className="container py-5">
        <div className="row g-5">
            <div className="col-lg-3 col-md-6">
                <h5 className="text-white mb-4">Get In Touch</h5>
                <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA</p>
                <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@example.com</p>
                <div className="d-flex pt-2">
                    <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-youtube"></i></a>
                    <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-linkedin-in"></i></a>
                </div>
            </div>
            <div className="col-lg-3 col-md-6">
                <h5 className="text-white mb-4">Quick Links</h5>
                <a className="btn btn-link text-white-50" href="">About Us</a>
                <a className="btn btn-link text-white-50" href="">Contact Us</a>
                <a className="btn btn-link text-white-50" href="">Our Services</a>
                <a className="btn btn-link text-white-50" href="">Privacy Policy</a>
                <a className="btn btn-link text-white-50" href="">Terms & Condition</a>
            </div>
            <div className="col-lg-3 col-md-6">
                <h5 className="text-white mb-4">Photo Gallery</h5>
                <div className="row g-2 pt-2">
                    <div className="col-4">
                        <img className="img-fluid rounded bg-light p-1" src={property1} alt="" />
                    </div>
                    <div className="col-4">
                        <img className="img-fluid rounded bg-light p-1" src={property2} alt="" />
                    </div>
                    <div className="col-4">
                        <img className="img-fluid rounded bg-light p-1" src={property3} alt="" />
                    </div>
                    <div className="col-4">
                        <img className="img-fluid rounded bg-light p-1" src={property4} alt="" />
                    </div>
                    <div className="col-4">
                        <img className="img-fluid rounded bg-light p-1" src={property5} alt="" />
                    </div>
                    <div className="col-4">
                        <img className="img-fluid rounded bg-light p-1" src={property6} alt="" />
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-6">
                <h5 className="text-white mb-4">Newsletter</h5>
                <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                <div className="position-relative mx-auto" style={{"max-width": "400px"}}>
                    <input className="form-control bg-transparent w-100 h-100 py-3 ps-4 pe-5" type="text" placeholder="Your email" />
                    <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
                </div>
            </div>
        </div>
    </div>
    <div className="container">
        <div className="copyright">
            <div className="row">
                <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                    &copy; <a className="border-bottom" href="#">Your Site Name</a>, All Right Reserved. 
      Designed By <a className="border-bottom" href="https://htmlcodex.com">HTML Codex</a>
                </div>
                <div className="col-md-6 text-center text-md-end">
                    <div className="footer-menu">
                        <a href="">Home</a>
                        <a href="">Cookies</a>
                        <a href="">Help</a>
                        <a href="">FQAs</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

export default Footer;