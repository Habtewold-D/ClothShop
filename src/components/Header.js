import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to toggle the menu visibility
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Function to close the menu when a menu item is clicked
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Bernos Design</Link>
      </div>
      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <NavLink 
              to="/" 
              activeClassName="active" 
              exact
              onClick={closeMenu}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/shop" 
              activeClassName="active"
              onClick={closeMenu}
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              activeClassName="active"
              onClick={closeMenu}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              activeClassName="active"
              onClick={closeMenu}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </header>
  );
};

export default Header;
