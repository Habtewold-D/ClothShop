// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import './styles/global.css';  // Global styles
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-flex-wrapper">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin-login" element={<AdminLogin />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
