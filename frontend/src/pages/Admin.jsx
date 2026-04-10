import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../api/config';

function Admin() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: 'organic',
    price: '',
    rawPrice: '',
    image: '📦'
  });

  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  let user = null;
  try { user = userStr ? JSON.parse(userStr) : null; } catch(e) {}

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        category: formData.category,
        price: formData.rawPrice, // Mongo schema expects Numeric price
        imageUrl: formData.image // We reuse image for emoji/url
      };
      // We will also pass the label string to match our frontend format
      const customPayload = { ...payload, priceLabel: formData.price }; 

      await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
        body: JSON.stringify(customPayload)
      });
      setFormData({ name: '', category: 'organic', price: '', rawPrice: '', image: '📦' });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`${API_BASE_URL}/api/products/${id}`, { 
          method: 'DELETE',
          headers: { 'x-auth-token': token }
        });
        fetchProducts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div style={{ textAlign: 'center', padding: '100px', minHeight: '60vh' }}>
        <h2 style={{ color: '#e74c3c' }}>Access Denied</h2>
        <p>You do not have administrator privileges to view this control panel.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '80vh', background: '#f4f6f8' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', background: '#2c3e50', color: 'white', padding: '20px' }}>
        <h2 style={{ marginBottom: '30px', color: '#27ae60' }}>Admin Dashboard</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '15px', cursor: 'pointer', background: '#34495e', padding: '10px', borderRadius: '5px' }}>📦 Manage Products</li>
          <li style={{ marginBottom: '15px', cursor: 'pointer', padding: '10px' }}>🛒 Orders (Coming Soon)</li>
          <li style={{ cursor: 'pointer', padding: '10px' }}>👥 Users (Coming Soon)</li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px' }}>
        <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Product Management</h2>
        
        {/* Add Product Form */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '15px' }}>Add New Product</h3>
          <form onSubmit={handleAddProduct} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required style={{ padding: '10px', flex: '1 1 200px', border: '1px solid #ddd', borderRadius: '4px' }} />
            
            <select name="category" value={formData.category} onChange={handleChange} style={{ padding: '10px', flex: '1 1 150px', border: '1px solid #ddd', borderRadius: '4px' }}>
              <option value="organic">Organic</option>
              <option value="dairy">Dairy & Eggs</option>
              <option value="bakery">Bakery</option>
              <option value="beverage">Beverage</option>
              <option value="pantry">Pantry</option>
              <option value="frozen">Frozen</option>
              <option value="health">Health</option>
              <option value="household">Household</option>
            </select>

            <input type="text" name="price" placeholder="Label (e.g. ₹200/kg)" value={formData.price} onChange={handleChange} required style={{ padding: '10px', flex: '1 1 150px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="number" name="rawPrice" placeholder="Raw Price (e.g. 200)" value={formData.rawPrice} onChange={handleChange} required style={{ padding: '10px', flex: '1 1 150px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <select name="image" value={formData.image} onChange={handleChange} required style={{ padding: '10px', flex: '1 1 100px', border: '1px solid #ddd', borderRadius: '4px' }}>
                <option value="📦">📦 Default Box</option>
                <optgroup label="Fruits">
                    <option value="🍎">🍎 Apple</option>
                    <option value="🍌">🍌 Banana</option>
                    <option value="🍊">🍊 Orange</option>
                    <option value="🍇">🍇 Grapes</option>
                    <option value="🍓">🍓 Strawberry</option>
                    <option value="🫐">🫐 Blueberries</option>
                    <option value="🍉">🍉 Watermelon</option>
                    <option value="🍋">🍋 Lemon</option>
                    <option value="🥭">🥭 Mango</option>
                    <option value="🍍">🍍 Pineapple</option>
                </optgroup>
                <optgroup label="Vegetables">
                    <option value="🥕">🥕 Carrot</option>
                    <option value="🥦">🥦 Broccoli</option>
                    <option value="🥬">🥬 Lettuce</option>
                    <option value="🍅">🍅 Tomato</option>
                    <option value="🥔">🥔 Potato</option>
                    <option value="🧅">🧅 Onion</option>
                    <option value="🧄">🧄 Garlic</option>
                    <option value="🌽">🌽 Corn</option>
                    <option value="🌶️">🌶️ Pepper</option>
                    <option value="🍄">🍄 Mushroom</option>
                </optgroup>
                <optgroup label="Dairy & Eggs">
                    <option value="🥛">🥛 Milk</option>
                    <option value="🧀">🧀 Cheese</option>
                    <option value="🥚">🥚 Eggs</option>
                    <option value="🧈">🧈 Butter</option>
                </optgroup>
                <optgroup label="Bakery">
                    <option value="🍞">🍞 Bread</option>
                    <option value="🥐">🥐 Croissant</option>
                    <option value="🥯">🥯 Bagel</option>
                    <option value="🍰">🍰 Cake</option>
                    <option value="🍪">🍪 Cookie</option>
                </optgroup>
                <optgroup label="Meat & Seafood">
                    <option value="🥩">🥩 Meat</option>
                    <option value="🍗">🍗 Chicken</option>
                    <option value="🥓">🥓 Bacon</option>
                    <option value="🐟">🐟 Fish</option>
                </optgroup>
                <optgroup label="Beverages">
                    <option value="🥤">🥤 Soda</option>
                    <option value="🧃">🧃 Juice</option>
                    <option value="☕">☕ Coffee</option>
                    <option value="🍵">🍵 Tea</option>
                    <option value="🍷">🍷 Wine</option>
                </optgroup>
                <optgroup label="Pantry">
                    <option value="🥫">🥫 Canned Soup</option>
                    <option value="🍝">🍝 Pasta</option>
                    <option value="🍚">🍚 Rice</option>
                    <option value="🧂">🧂 Salt</option>
                    <option value="🍯">🍯 Honey</option>
                </optgroup>
                <optgroup label="Frozen">
                    <option value="🍦">🍦 Ice Cream</option>
                    <option value="🍕">🍕 Pizza</option>
                    <option value="🍟">🍟 Fries</option>
                </optgroup>
                <optgroup label="Health & Household">
                    <option value="💊">💊 Vitamins</option>
                    <option value="🧴">🧴 Lotion</option>
                    <option value="🪥">🪥 Toothbrush</option>
                    <option value="🧻">🧻 Toilet Paper</option>
                    <option value="🧼">🧼 Soap</option>
                    <option value="🧽">🧽 Sponge</option>
                    <option value="🪄">🪄 Cleaning</option>
                </optgroup>
            </select>
            
            <button type="submit" style={{ padding: '10px 20px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Add Product</button>
          </form>
        </div>

        {/* Product Table */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '15px' }}>Existing Database Products</h3>
          {products.length === 0 ? <p>No products in the database yet.</p> : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee' }}>
                  <th style={{ padding: '10px' }}>Image</th>
                  <th style={{ padding: '10px' }}>Name</th>
                  <th style={{ padding: '10px' }}>Category</th>
                  <th style={{ padding: '10px' }}>Raw Price</th>
                  <th style={{ padding: '10px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px', fontSize: '1.5rem' }}>{p.imageUrl || '📦'}</td>
                    <td style={{ padding: '10px' }}>{p.name}</td>
                    <td style={{ padding: '10px', textTransform: 'capitalize' }}>{p.category}</td>
                    <td style={{ padding: '10px' }}>₹{p.price}</td>
                    <td style={{ padding: '10px' }}>
                      <button onClick={() => handleDelete(p._id)} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
