import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('adminToken'));
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onStorage = () => setIsAdmin(!!localStorage.getItem('adminToken'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('adminToken'));
    setMenuOpen(false); // close menu on route change
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
    navigate('/');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Link to="/">
          <img src="/assets/images/bernos Logo.jpg" alt="Bernos Logo" className="header-logo-img" />
        </Link>
        <span className="header-amharic">በርኖስ - Bernos</span>
      </div>
      <div
        className={`mobile-nav-overlay${menuOpen ? ' open' : ''}`}
        onClick={closeMenu}
        aria-hidden={!menuOpen}
      />
      <nav className={`nav${menuOpen ? ' open' : ''}`}>
        <ul>
          <li>
            <NavLink to="/" activeClassName="active" exact onClick={closeMenu}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/shop" activeClassName="active" onClick={closeMenu}>Shop</NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="active" onClick={closeMenu}>About Us</NavLink>
          </li>
          <li>
            <NavLink to="/contact" activeClassName="active" onClick={closeMenu}>Contact</NavLink>
          </li>
          {!isAdmin ? (
            <li>
              <Link to="/admin-login" className="login-btn" title="Admin Login" onClick={closeMenu}>
                <FaUserCircle size={28} />
              </Link>
            </li>
          ) : (
            <li>
              <button className="logout-btn nav-logout" onClick={() => { handleLogout(); closeMenu(); }}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </header>
  );
};

export default Header;