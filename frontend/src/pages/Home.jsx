import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <section id="home" className="hero">
          <div className="hero-content" style={{ margin: '0 auto', maxWidth: '800px', textAlign: 'center' }}>
              <h2>Fresh. Local. Affordable.</h2>
              <p>Discover the finest selection of fresh groceries delivered to your doorstep</p>
              <div className="hero-cta" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                  <Link to="/shop" className="btn-primary">Shop Now</Link>
                  <Link to="/weeklydeals" className="btn-secondary">View Weekly Deals</Link>
              </div>
          </div>
      </section>
      <br />
      <hr />
    </>
  );
}
export default Home;
