import React from 'react';

function WeeklyDeals() {
  return (
    <section id="specials" className="specials-section">
        <div className="container" style={{ padding: '50px 20px', minHeight: '60vh' }}>
            <h2 style={{textTransform: 'capitalize', textAlign: 'center', fontSize: '2.5rem', marginBottom: '40px', color: '#2c5530'}}>Weekly Specials & Deals</h2>
            <div className="deals-grid">
                <div className="deal-card">
                    <div className="deal-badge">50% OFF</div>
                    <div className="product-image" style={{fontSize: '3rem', marginBottom: '10px'}}>🥩</div>
                    <h3>Premium Steaks</h3>
                    <p className="original-price">₹1999/kg</p>
                    <p className="sale-price">₹999/kg</p>
                    <button className="btn-deal">Grab Deal</button>
                </div>
                <div className="deal-card">
                    <div className="deal-badge">Buy 2 Get 1 Free</div>
                    <div className="product-image" style={{fontSize: '3rem', marginBottom: '10px'}}>🍞</div>
                    <h3>Bakery Bread</h3>
                    <p className="price" style={{ color: '#4a7c59', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1rem' }}>₹120 each</p>
                    <button className="btn-deal">Grab Deal</button>
                </div>
                <div className="deal-card">
                    <div className="deal-badge">30% OFF</div>
                    <div className="product-image" style={{fontSize: '3rem', marginBottom: '10px'}}>🥗</div>
                    <h3>Organic Produce</h3>
                    <p className="original-price">₹400</p>
                    <p className="sale-price">₹280</p>
                    <button className="btn-deal">Grab Deal</button>
                </div>
            </div>
        </div>
    </section>
  );
}

export default WeeklyDeals;
