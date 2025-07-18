// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import './styles/global.css';  // Global styles
import Footer from './components/Footer';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('adminToken'));
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.reload();
  };
  return (
    <Router>
      <Header />
      {isAdmin && (
        <div style={{ textAlign: 'right', padding: '10px 30px 0 0' }}>
          <button onClick={handleLogout} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', cursor: 'pointer' }}>Logout</button>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
