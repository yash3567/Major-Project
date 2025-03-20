import Layout from "./../../components/layouts/Layout";

const ContactUs = () => {
  return (
    <Layout>
      <div className="container py-5">
        
        {/* Contact Us Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 mb-8 "style={{"fontWeight":"bolder", "color":"#112143"}}>Contact Us</h1>
          <p className="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>

        {/* Main Content Section */}
        <div className="row g-5 align-items-center">
          
          {/* Map Section (Left) */}
          <div className="col-lg-7 col-md-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3512.3604675912125!2d79.0782934104715!3d21.16513828299988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c10437c37685%3A0xa2949c9d9fc2f903!2sAnjuman%20college%20of%20Engineering%20and%20Technology!5e1!3m2!1sen!2sin!4v1729168922347!5m2!1sen!2sin"
              width="100%"
              height="450"
              className="border rounded shadow-sm"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Form Section (Right) */}
          <div className="col-lg-5 col-md-12">
            <div className="p-4 border rounded shadow-sm bg-light">
              
              {/* Contact Details */}
              <div className="mb-4">
                <h2 className="text-center mb-3 text-blue-800" style={{"fontWeight":"bolder", "fontSize":"30px",}}>Get In Touch</h2>
                <p><strong>Contact:</strong> +91724xxxxxx</p>
                <p><strong>Address:</strong> Mangalwari Bazar Road, Nagpur, Maharashtra 440001</p>
                <p><strong>Email:</strong> work.station@gmail.com</p>
              </div>

              {/* Contact Form */}
              <form className="needs-validation" noValidate>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Your Email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Your Address"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="4"
                    placeholder="Your Message"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
