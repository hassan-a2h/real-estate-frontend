import testimonial1 from '../assets/img/testimonial-1.jpg';
import testimonial2 from '../assets/img/testimonial-2.jpg';
import testimonial3 from '../assets/img/testimonial-3.jpg';

const Testimonials = () => {
  return (
    <div className="container-xxl py-5">
    <div className="container">
        <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{"maxWidth": "600px"}}>
            <h1 className="mb-3">Our Clients Say!</h1>
            <p>Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
        </div>
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
  <div className="carousel-inner">
  <div className="testimonial-carousel wow fadeInUp" data-wow-delay="0.1s">
    <div className="carousel-item active">
    <div className="testimonial-item bg-light rounded p-3">
                <div className="bg-white border rounded p-4">
                    <p>Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet est kasd kasd erat eos</p>
                    <div className="d-flex align-items-center">
                        <img className="img-fluid flex-shrink-0 rounded" src={testimonial1} style={{"width": "45px", "height": "45px"}} />
                        <div className="ps-3">
                            <h6 className="fw-bold mb-1">Client Name</h6>
                            <small>Profession</small>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    <div className="carousel-item">
    <div className="testimonial-item bg-light rounded p-3">
                <div className="bg-white border rounded p-4">
                    <p>Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet est kasd kasd erat eos</p>
                    <div className="d-flex align-items-center">
                        <img className="img-fluid flex-shrink-0 rounded" src={testimonial3} style={{"width": "45px", "height": "45px"}} />
                        <div className="ps-3">
                            <h6 className="fw-bold mb-1">Client Name</h6>
                            <small>Profession</small>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    <div className="carousel-item">
    <div className="testimonial-item bg-light rounded p-3">
                <div className="bg-white border rounded p-4">
                    <p>Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet est kasd kasd erat eos</p>
                    <div className="d-flex align-items-center">
                        <img className="img-fluid flex-shrink-0 rounded" src={testimonial2} style={{"width": "45px", "height": "45px"}} />
                        <div className="ps-3">
                            <h6 className="fw-bold mb-1">Client Name</h6>
                            <small>Profession</small>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
        
    </div>
</div>
  )
};

export default Testimonials;