import callToAction from '../assets/img/call-to-action.jpg';

const ContactUs = () => {
  return (
    <div className="container-xxl py-5">
    <div className="container">
        <div className="bg-light rounded p-3">
            <div className="bg-white rounded p-4" style={{"border": "1px dashed rgba(0, 185, 142, .3)"}}>
                <div className="row g-5 align-items-center">
                    <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                        <img className="img-fluid rounded w-100" src={callToAction} alt="" />
                    </div>
                    <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                        <div className="mb-4">
                            <h1 className="mb-3">Contact With Our Certified Agent</h1>
                            <p>Eirmod sed ipsum dolor sit rebum magna erat. Tempor lorem kasd vero ipsum sit sit diam justo sed vero dolor duo.</p>
                        </div>
                        <a href="skype:Makaan_Properties?call" className="btn btn-primary py-3 px-4 me-2"><i className="fa fa-phone-alt me-2"></i>Make A Call</a>
                        <a href="https://calendar.google.com/calendar/render?action=TEMPLATE" target="_blank" className="btn btn-dark py-3 px-4"><i className="fa fa-calendar-alt me-2"></i>Get Appoinment</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

export default ContactUs;