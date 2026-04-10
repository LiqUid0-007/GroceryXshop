import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import API_BASE_URL from '../api/config';

const categoryData = {
  organic: [
    { id: 1, image: '🍎', name: 'Honeycrisp Apples', price: '₹240/kg', rawPrice: 240 },
    { id: 2, image: '🥕', name: 'Organic Carrots', price: '₹150/bunch', rawPrice: 150 },
    { id: 3, image: '🍌', name: 'Fresh Bananas', price: '₹100/kg', rawPrice: 100 },
    { id: 4, image: '🥬', name: 'Fresh Lettuce', price: '₹200/each', rawPrice: 200 }
  ],
  dairy: [
    { id: 5, image: '🥛', name: 'Whole Milk', price: '₹68/L', rawPrice: 68 },
    { id: 6, image: '🥚', name: 'Farm Fresh Eggs', price: '₹85/dz', rawPrice: 85 },
    { id: 7, image: '🧀', name: 'Cheddar Cheese', price: '₹350/500g', rawPrice: 350 },
    { id: 8, image: '🧈', name: 'Salted Butter', price: '₹550/500g', rawPrice: 550 }
  ],
  bakery: [
    { id: 9, image: '🍞', name: 'Sourdough Bread', price: '₹120', rawPrice: 120 },
    { id: 10, image: '🥐', name: 'Butter Croissant', price: '₹80', rawPrice: 80 },
    { id: 11, image: '🥯', name: 'Plain Bagel', price: '₹60', rawPrice: 60 },
    { id: 12, image: '🍰', name: 'Cheesecake Slice', price: '₹250', rawPrice: 250 }
  ],
  beverage: [
    { id: 13, image: '🥤', name: 'Cola 12-pack', price: '₹480', rawPrice: 480 },
    { id: 14, image: '🧃', name: 'Apple Juice', price: '₹140', rawPrice: 140 },
    { id: 15, image: '☕', name: 'Ground Coffee', price: '₹400/250g', rawPrice: 400 },
    { id: 16, image: '🍵', name: 'Green Tea', price: '₹200/100g', rawPrice: 200 }
  ],
  pantry: [
    { id: 17, image: '🥫', name: 'Tomato Soup', price: '₹60', rawPrice: 60 },
    { id: 18, image: '🍝', name: 'Spaghetti Pasta', price: '₹180/500g', rawPrice: 180 },
    { id: 19, image: '🍚', name: 'Basmati Rice', price: '₹450/5kg', rawPrice: 450 },
    { id: 20, image: '🧂', name: 'Sea Salt', price: '₹40/kg', rawPrice: 40 }
  ],
  frozen: [
    { id: 21, image: '🍦', name: 'Vanilla Ice Cream', price: '₹300', rawPrice: 300 },
    { id: 22, image: '🍕', name: 'Frozen Pizza', price: '₹350', rawPrice: 350 },
    { id: 23, image: '🍟', name: 'French Fries', price: '₹220', rawPrice: 220 },
    { id: 24, image: '🫐', name: 'Frozen Blueberries', price: '₹400', rawPrice: 400 }
  ],
  health: [
    { id: 25, image: '💊', name: 'Multivitamins', price: '₹800', rawPrice: 800 },
    { id: 26, image: '🧴', name: 'Body Lotion', price: '₹450', rawPrice: 450 },
    { id: 27, image: '🪥', name: 'Toothbrush Set', price: '₹150', rawPrice: 150 },
    { id: 28, image: '🩹', name: 'Bandages', price: '₹80', rawPrice: 80 }
  ],
  household: [
    { id: 29, image: '🧻', name: 'Paper Towels', price: '₹180', rawPrice: 180 },
    { id: 30, image: '🚽', name: 'Toilet Paper', price: '₹280', rawPrice: 280 },
    { id: 31, image: '🧼', name: 'Dish Soap', price: '₹90', rawPrice: 90 },
    { id: 32, image: '🧽', name: 'Sponges (4-pack)', price: '₹120', rawPrice: 120 }
  ]
};

function Category() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext); // Inject Custom Context

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      let combinedItems = [];
      const lowercaseCategory = categoryName.toLowerCase();
      
      // 1. Load static mock products
      const staticItems = categoryData[lowercaseCategory] || [];
      combinedItems = [...staticItems];
      
      // 2. Fetch dynamic products from MongoDB database
      try {
        const res = await fetch(`${API_BASE_URL}/api/products`);
        if (res.ok) {
          const dbProducts = await res.json();
          // Map DB models to frontend format
          const formattedDbItems = dbProducts
            .filter(p => p.category.toLowerCase() === lowercaseCategory)
            .map(p => ({
              id: p._id,
              name: p.name,
              image: p.imageUrl || '📦',
              price: `₹${p.price}`, 
              rawPrice: p.price
            }));
          combinedItems = [...combinedItems, ...formattedDbItems];
        }
      } catch (err) {
        console.error('Error fetching dynamic products:', err);
      }
      
      setProducts(combinedItems);
    };

    fetchCategoryProducts();
  }, [categoryName]);

  const displayTitle = categoryName === 'organic' ? 'Organic Products' : `${categoryName} Products`;

  return (
    <section className="produce-section" style={{ minHeight: '60vh', padding: '50px 20px', background: '#f0fbf4' }}>
      <div className="container">
        <h2 style={{textTransform: 'capitalize', textAlign: 'center', fontSize: '2.5rem', marginBottom: '40px', color: '#2c5530'}}>{displayTitle}</h2>
        
        {products.length === 0 ? (
           <p style={{textAlign: 'center', fontSize: '1.2rem', color: '#666'}}>No products found in this category.</p>
        ) : (
          <div className="product-grid" style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px'
          }}>
            {products.map(product => (
              <div key={product.id} className="product-card" style={{
                background: '#fff',
                padding: '30px 20px',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <div className="product-image" style={{fontSize: '3rem', marginBottom: '15px'}}>{product.image}</div>
                <h3 style={{marginBottom: '10px', color: '#2c5530', fontSize: '1.2rem'}}>{product.name}</h3>
                <p className="price" style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#4CAF50', marginBottom: '15px'}}>{product.price}</p>
                <button 
                  onClick={() => addToCart(product)} 
                  className="btn-add" 
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Category;
