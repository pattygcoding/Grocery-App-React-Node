import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import ItemCard from '../components/ItemCard';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
    loadItems();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadItems = async (category = null) => {
    try {
      setLoading(true);
      const data = await api.getItems(category);
      setItems(data);
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      loadItems(null);
    } else {
      setSelectedCategory(categoryId);
      loadItems(categoryId);
    }
  };

  return (
    <div className="container">
      <h1 style={{ margin: '2rem 0', color: '#2c3e50' }}>Browse by Category</h1>
      
      <div className="categories">
        {categories.map(category => (
          <div
            key={category.id}
            className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="category-icon">{category.icon}</div>
            <div className="category-name">{category.name}</div>
          </div>
        ))}
      </div>

      <h2 style={{ margin: '2rem 0', color: '#2c3e50' }}>
        {selectedCategory 
          ? categories.find(c => c.id === selectedCategory)?.name 
          : 'All Items'}
      </h2>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '2rem' }}>Loading...</p>
      ) : items.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '2rem' }}>No items found</p>
      ) : (
        <div className="items-grid">
          {items.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
