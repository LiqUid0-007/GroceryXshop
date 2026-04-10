import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../api/config';

function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.rawPrice * item.quantity), 0);
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please login first to place an order!");
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
        body: JSON.stringify({ items: cart, totalAmount: calculateTotal() })
      });
      if (res.ok) {
        clearCart();
        alert("Order placed successfully!");
      } else {
        alert("checkout failed.");
      }
    } catch(e) { console.error(e); }
  };

  return (
    <section className="cart-section" style={{ minHeight: '60vh', padding: '50px 20px', background: '#f8f9fa' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#2c5530', marginBottom: '30px' }}>Your Cart</h2>
        
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>Your cart is empty.</p>
            <Link to="/shop" className="btn-primary">Browse Shop</Link>
          </div>
        ) : (
          <div>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '20px' }}>
              {cart.map(item => (
                <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #ddd' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '2rem' }}>{item.image}</span>
                    <div>
                      <h4 style={{ margin: 0, color: '#333' }}>{item.name}</h4>
                      <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{item.priceLabel || item.price} x {item.quantity}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <strong style={{ color: '#2c5530' }}>₹{item.rawPrice * item.quantity}</strong>
                    <button onClick={() => removeFromCart(item.id)} style={{ padding: '6px 12px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #2c5530', paddingTop: '20px' }}>
              <h3 style={{ margin: 0 }}>Total:</h3>
              <h3 style={{ margin: 0, color: '#e74c3c' }}>₹{calculateTotal()}</h3>
            </div>
            
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', marginTop: '30px' }}>
               <button onClick={clearCart} style={{ padding: '12px 24px', background: '#95a5a6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Clear Cart</button>
               <button onClick={handleCheckout} style={{ padding: '12px 24px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;
