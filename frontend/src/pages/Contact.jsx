import React from 'react';

function Contact() {
  return (
    <section id="contact" className="contact-section" style={{ minHeight: '60vh' }}>
      <div className="container">
        <h2 style={{textTransform: 'capitalize', textAlign: 'center', fontSize: '2.5rem', marginBottom: '40px', color: '#27ae60'}}>Contact Us</h2>
        <div className="contact-grid">
          
          <div className="contact-form">
            <h3>Send Us a Message</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" placeholder="Enter your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Write your message here..." required></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>Send Message</button>
            </form>
          </div>
          
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>📍 Marwadi University, Bedi, Morbi 360003</p>
            <p>📞 (555) 000-FRESH</p>
            <p>✉️ support@freshmart.com</p>
            <h4>Business Hours</h4>
            <p>Monday - Sunday<br/>6:00 AM - 11:00 PM</p>
            <div className="map-placeholder" style={{ background: '#eaeaed', padding: '20px', textAlign: 'center', borderRadius: '8px', marginTop: '15px' }}>
                🗺️ Map Coming Soon
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;
