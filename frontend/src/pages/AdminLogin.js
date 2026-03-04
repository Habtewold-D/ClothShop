import React, { useState } from 'react';
import { apiService } from '../services/apiService';
import './AdminLogin.css';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await apiService.login(username, password);
      localStorage.setItem('adminToken', data.token);
      if (onLogin) onLogin();
      navigate('/shop');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="admin-login-noble">
      {/* Cinematic Background */}
      <div className="login-bg-container">
        <img src="/assets/images/contact-hero.png" alt="Bernos" className="login-bg-img" />
        <div className="login-dark-overlay"></div>
      </div>

      <div className="login-card-elite">
        <header className="login-header-boutique">
          <h2 className="brand-font-noble">Staff Portal</h2>
          <div className="mosaic-divider"></div>
        </header>

        <form className="login-form-boutique" onSubmit={handleSubmit}>
          <div className="input-group-boutique">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="boutique-input"
            />
          </div>
          <div className="input-group-boutique password-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="boutique-input"
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" disabled={loading} className="btn-majestic-gold-sm">
            {loading ? 'Verifying...' : 'Authenticate'}
          </button>
          {error && <div className="error-boutique">{error}</div>}
        </form>

      </div>
    </div>
  );
};

export default AdminLogin; 