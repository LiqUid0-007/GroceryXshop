import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../api/config';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetch(`${API_BASE_URL}/api/orders/myorders`, {
        headers: { 'x-auth-token': token }
      })
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error(err));
    }
  }, [token]);

  if (!token) return <h2 style={{textAlign: 'center', marginTop: '50px', minHeight:'50vh'}}>Please log in to view orders.</h2>;

  return (
    <div style={{ minHeight: '70vh', padding: '50px 20px', background: '#f4f6f8' }} className="container">
      <h2 style={{ textAlign: 'center', color: '#2c5530', marginBottom: '30px', fontSize: '2.5rem' }}>Your Order History</h2>
      {orders.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>You haven't placed any orders yet.</p>
      ) : (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {orders.map(order => (
            <div key={order._id} style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>
                <span style={{ fontWeight: 'bold', color: '#666' }}>Order ID: {order._id}</span>
                <span style={{ background: '#e8f5e9', color: '#2e7d32', padding: '5px 10px', borderRadius: '15px', fontSize: '0.9rem', fontWeight: 'bold' }}>{order.status}</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {order.items.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span>{item.image} {item.name} x {item.quantity}</span>
                    <span>₹{item.rawPrice * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <div style={{ textAlign: 'right', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee', fontWeight: 'bold', fontSize: '1.2rem', color: '#c0392b' }}>
                Total: ₹{order.totalAmount}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '10px' }}>
                Placed on: {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default OrderHistory;
