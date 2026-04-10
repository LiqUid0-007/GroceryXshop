import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Header() {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  let user = null;
  try {
     user = userStr ? JSON.parse(userStr) : null;
  } catch(e) {}

  const handleLogout = () => {
     localStorage.removeItem('token');
     localStorage.removeItem('user');
     navigate('/login');
     window.location.reload();
  };

  return (
    <header className="header">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="nav-brand">
              <Link to="/" style={{textDecoration: 'none'}}><h1>🛒 FreshMart</h1></Link>
          </div>
          <nav className="nav-menu">
              <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
              </ul>
          </nav>
          <div className="cart-icon" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {token ? (
                 <>
                   <span style={{ color: '#fff', fontWeight: 'bold' }}>Hi, {user?.name?.split(' ')[0]}</span>
                   <Link to="/orders" style={{ color: '#fff', fontWeight: 'bold', textDecoration: 'underline' }}>Orders</Link>
                   {user?.role === 'admin' && (
                     <Link to="/admin" style={{ color: '#f1c40f', fontWeight: 'bold', textDecoration: 'none' }}>Admin Panel</Link>
                   )}
                   <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid #fff', color: '#fff', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
                 </>
              ) : (
                 <Link to="/login" style={{ color: '#fff', fontWeight: 'bold', textDecoration: 'none' }}>Login</Link>
              )}
              <Link to="/cart" className="cart-btn">
                  <span> 🛍️ Cart ({totalItems})</span>
              </Link>
          </div>
      </div>
    </header>
  );
}

export default Header;
