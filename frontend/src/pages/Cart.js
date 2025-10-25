import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert(`Thank you for your order! Total: $${getTotalPrice().toFixed(2)}`);
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="container">
        <div className="cart-container">
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Start shopping to add items to your cart!</p>
            <button onClick={() => navigate('/')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 style={{ margin: '2rem 0', color: '#2c3e50' }}>Shopping Cart</h1>
      
      <div className="cart-container">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-info">
              <div className="cart-item-icon">{item.image}</div>
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price">${item.price.toFixed(2)} each</div>
              </div>
            </div>
            <div className="cart-item-actions">
              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="quantity-btn"
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
              <div className="cart-item-price" style={{ fontWeight: 'bold' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="btn btn-danger"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="cart-total">
          <span>Total:</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button onClick={() => navigate('/')} className="btn btn-secondary">
            Continue Shopping
          </button>
          <button onClick={handleCheckout} className="btn btn-success">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
