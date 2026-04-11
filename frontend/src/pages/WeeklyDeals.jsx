import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const deals = [
  { id: 'deal-1', image: '🥩', name: 'Premium Steaks', originalPrice: '₹1999/kg', price: '₹999/kg', rawPrice: 999 },
  { id: 'deal-2', image: '🍞', name: 'Bakery Bread', price: '₹120 each', rawPrice: 120 },
  { id: 'deal-3', image: '🥗', name: 'Organic Produce', originalPrice: '₹400', price: '₹280', rawPrice: 280 }
];

function WeeklyDeals() {
  const { addToCart } = useContext(CartContext);

  const handleGrabDeal = (deal) => {
    // Adapt deal structure to match expected cart item format if necessary
    const cartProduct = {
        id: deal.id,
        name: deal.name,
        image: deal.image,
        price: deal.price,
        rawPrice: deal.rawPrice
    };
    addToCart(cartProduct);
    alert(`${deal.name} added to cart!`);
  };

  return (
    <section id="specials" className="specials-section">
        <div className="container" style={{ padding: '50px 20px', minHeight: '60vh' }}>
            <h2 style={{textTransform: 'capitalize', textAlign: 'center', fontSize: '2.5rem', marginBottom: '40px', color: '#2c5530'}}>Weekly Specials & Deals</h2>
            <div className="deals-grid">
                {deals.map((deal, index) => (
                    <div key={deal.id} className="deal-card">
                        <div className="deal-badge">
                            {index === 0 ? '50% OFF' : index === 1 ? 'Buy 2 Get 1 Free' : '30% OFF'}
                        </div>
                        <div className="product-image" style={{fontSize: '3rem', marginBottom: '10px'}}>{deal.image}</div>
                        <h3>{deal.name}</h3>
                        {deal.originalPrice && <p className="original-price">{deal.originalPrice}</p>}
                        <p className={deal.originalPrice ? "sale-price" : "price"} style={!deal.originalPrice ? { color: '#4a7c59', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1rem' } : {}}>
                            {deal.price}
                        </p>
                        <button className="btn-deal" onClick={() => handleGrabDeal(deal)}>Grab Deal</button>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}

export default WeeklyDeals;
