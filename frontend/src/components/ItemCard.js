import React from 'react';
import { useCart } from '../context/CartContext';

const ItemCard = ({ item }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item);
  };

  return (
    <div className="item-card">
      <div className="item-icon">{item.image}</div>
      <h3 className="item-name">{item.name}</h3>
      <p className="item-description">{item.description}</p>
      <p className="item-price">${item.price.toFixed(2)}</p>
      <button onClick={handleAddToCart} className="btn btn-success">
        Add to Cart
      </button>
    </div>
  );
};

export default ItemCard;
