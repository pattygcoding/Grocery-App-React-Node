import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { logout, isAuthenticated, isAdmin } = useAuth();
  const { getTotalItems } = useCart();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          🛒 Grocery App
        </Link>
        <nav className="nav">
          <Link to="/">Shop</Link>
          <Link to="/cart">
            <div className="cart-icon">
              🛒
              {getTotalItems() > 0 && (
                <span className="cart-count">{getTotalItems()}</span>
              )}
            </div>
          </Link>
          {isAuthenticated ? (
            <>
              {isAdmin && <Link to="/admin">Admin</Link>}
              <button onClick={logout} className="btn btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
