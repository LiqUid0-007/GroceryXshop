import React from 'react';
import { Link } from 'react-router-dom';

function Shop() {
  return (
    <main className="shop-container container" style={{ minHeight: '70vh', padding: '40px 20px', background: '#f8f9fa' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#2c5530', marginBottom: '30px' }}>Choose Your Category</h2>
      <div className="category-grid">
        <Link to="/shop/dairy" className="category-card">🥛 Dairy & Eggs</Link>
        <Link to="/shop/organic" className="category-card">🌱 Organic Products</Link>
        <Link to="/shop/bakery" className="category-card">🍞 Bakery</Link>
        <Link to="/shop/beverage" className="category-card">🥤 Beverages</Link>
        <Link to="/shop/pantry" className="category-card">🛍️ Pantry</Link>
        <Link to="/shop/frozen" className="category-card">❄️ Frozen Foods</Link>
        <Link to="/shop/health" className="category-card">💊 Supplements</Link>
        <Link to="/shop/household" className="category-card">🏠 Household Items</Link>
      </div>
    </main>
  );
}
export default Shop;
