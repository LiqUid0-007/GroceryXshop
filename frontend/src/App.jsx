import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Category from './pages/Category';
import WeeklyDeals from './pages/WeeklyDeals';
import Contact from './pages/Contact';
import ReturnPolicy from './pages/ReturnPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import OrderHistory from './pages/OrderHistory';
import { CartProvider } from './context/CartContext';
import './App.css';

// Generic placeholder components for About and FAQ
function About() { return <div style={{padding:'50px', textAlign:'center', minHeight:'50vh'}}><h2>About Us</h2><p>Coming Soon</p></div>; }
function FAQ() { return <div style={{padding:'50px', textAlign:'center', minHeight:'50vh'}}><h2>FAQ</h2><p>Coming Soon</p></div>; }

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:categoryName" element={<Category />} />
            <Route path="/cart" element={<Cart />} />
            
            <Route path="/weeklydeals" element={<WeeklyDeals />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/returnpolicy" element={<ReturnPolicy />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>
        <Footer />
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
