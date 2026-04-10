import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
      <footer className="footer">
          <div className="container">
              <div className="footer-content" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <div className="footer-section">
                      <h3>🛒 FreshMart</h3>
                      <p>Your trusted neighborhood grocery store since 2025.</p>
                      <div className="social-links" style={{ display: 'flex', gap: '10px' }}>
                          <a href="#">📘 Facebook</a>
                          <a href="#">📷 Instagram</a>
                          <a href="#">🐦 Twitter</a>
                      </div>
                  </div>
                  <div className="footer-section">
                      <h4>Quick Links</h4>
                      <ul style={{ listStyle: 'none' }}>
                          <li><Link to="/">Home</Link></li>
                          <li><Link to="/shop">Products</Link></li>
                          <li><Link to="/weeklydeals">Weekly Deals</Link></li>
                          <li><Link to="/about">About Us</Link></li>
                      </ul>
                  </div>
                  <div className="footer-section">
                      <h4>Customer Service</h4>
                      <ul style={{ listStyle: 'none' }}>
                          <li><Link to="/contact">Contact Us</Link></li>
                          <li><Link to="/faq">FAQ</Link></li>
                          <li><Link to="/returnpolicy">Return Policy</Link></li>
                          <li><Link to="/privacypolicy">Privacy Policy</Link></li>
                      </ul>
                  </div>
                  <div className="footer-section">
                      <h4>Store Hours</h4>
                      <p>Monday - Sunday<br/>6:00 AM - 11:00 PM</p>
                      <p>📞 Customer Service<br/>(555) 000-FRESH</p>
                  </div>
              </div>
              <div className="footer-bottom" style={{ textAlign: 'center', marginTop: '20px' }}>
                  <p>&copy; 2025 FreshMart Grocery Store. All rights reserved.</p>
              </div>
          </div>
      </footer>
  );
}

export default Footer;
