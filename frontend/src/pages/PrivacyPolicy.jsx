import React from 'react';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  return (
    <section className="policy-section" style={{ padding: '50px 20px', minHeight: '60vh' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#2c5530', textAlign: 'center', marginBottom: '20px', fontSize: '2rem' }}>🔒 Privacy Policy</h2>
        <p style={{ marginBottom: '30px' }}>At FreshMart, your privacy is very important to us. This policy explains how we collect, use, and protect your personal information when you shop with us online or in-store.</p>

        <div className="policy-item" style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>1. Information We Collect</h3>
          <p>- Name, phone number, email address, and delivery address when placing an order.<br/>
             - Payment details (secured via trusted payment gateways).<br/>
             - Browsing data such as pages visited and items viewed on our website.</p>
        </div>

        <div className="policy-item" style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>2. How We Use Your Information</h3>
          <p>- To process and deliver your orders.<br/>
             - To provide customer support and updates.<br/>
             - To send promotions and deals (only if you subscribe).<br/>
             - To improve our website and shopping experience.</p>
        </div>

        <div className="policy-item" style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>3. Sharing of Information</h3>
          <p>- We do not sell or trade your personal information.<br/>
             - We only share with trusted service providers (like delivery partners and payment processors) to complete your order.<br/>
             - Legal disclosure if required by law.</p>
        </div>

        <div className="policy-item" style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>4. Data Security</h3>
          <p>- We use encryption and secure systems to protect your personal and payment information.<br/>
             - Only authorized staff can access sensitive data.</p>
        </div>

        <div className="policy-item" style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>5. Cookies</h3>
          <p>- Our website uses cookies to improve user experience.<br/>
             - You can disable cookies in your browser settings, but some features may not work properly.</p>
        </div>

        <div className="policy-item" style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>6. Your Rights</h3>
          <p>- You may request to update or delete your personal information anytime by contacting our <Link to="/contact">Customer Support</Link>.<br/>
             - You may unsubscribe from promotional emails at any time.</p>
        </div>

        <div className="policy-item" style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>7. Contact Us</h3>
          <p>If you have any questions about our privacy practices, please reach out at 📞 (555) 000-FRESH or visit our <Link to="/contact">Contact Page</Link>.</p>
        </div>
      </div>
    </section>
  );
}

export default PrivacyPolicy;
