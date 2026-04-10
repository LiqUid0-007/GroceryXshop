import React from 'react';
import { Link } from 'react-router-dom';

function ReturnPolicy() {
  return (
    <section className="policy-section" style={{ padding: '50px 20px', minHeight: '60vh' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#2c5530', textAlign: 'center', marginBottom: '20px', fontSize: '2rem' }}>📦 Return & Refund Policy</h2>
        <p style={{ marginBottom: '30px' }}>We value your satisfaction and want you to enjoy shopping with FreshMart. If you’re not happy with your purchase, our return policy makes it simple for you.</p>

        <div className="policy-item" style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>1. Eligibility for Returns</h3>
          <p>- Items must be returned within <b>7 days</b> of purchase.<br/>
             - Items should be unused, unopened, and in their original packaging.<br/>
             - Perishable goods like fresh fruits, vegetables, dairy, and meat are not eligible unless they were delivered damaged or spoiled.</p>
        </div>

        <div className="policy-item" style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>2. Damaged or Wrong Items</h3>
          <p>If you receive a damaged or incorrect product, please contact our <Link to="/contact">Customer Service</Link> within <b>24 hours</b> of delivery. We’ll replace it or issue a refund.</p>
        </div>

        <div className="policy-item" style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>3. Refunds</h3>
          <p>- Refunds will be processed within <b>5-7 business days</b> after we receive and inspect the returned item.<br/>
             - Refunds will be credited to your original payment method.</p>
        </div>

        <div className="policy-item" style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>4. Non-Returnable Items</h3>
          <p>- Fresh produce (fruits, vegetables, meat, fish).<br/>
             - Opened or used food items.<br/>
             - Discounted or clearance products (unless defective).</p>
        </div>

        <div className="policy-item" style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>5. How to Return</h3>
          <p>- Visit your nearest FreshMart Store with the item and invoice.<br/>
             - Or, contact our <Link to="/contact">Customer Support</Link> to schedule a return pickup.</p>
        </div>

        <p style={{ marginTop: '20px', fontWeight: 'bold' }}>Need help? Reach out at 📞 (555) 000-FRESH or email us at <Link to="/contact">Customer Care</Link>.</p>
      </div>
    </section>
  );
}

export default ReturnPolicy;
