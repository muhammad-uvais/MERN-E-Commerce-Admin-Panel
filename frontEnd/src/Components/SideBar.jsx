import React, { useEffect, useState } from 'react';
import '../Style/sideBar.css';
import axios from 'axios';

const SideBar = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:3000/getproducts');
      const uniqueCategories = [];
      res.data.forEach(product => {
        if (!uniqueCategories.includes(product.category)) {
          uniqueCategories.push(product.category);
        }
      });
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div className='sidebar-wrapper'>
      <div className='sidebar-heading'>
        <h1>Categories</h1>
      </div>
      <div className='sidebar-menu'>
        <ul>
          <li onClick={() => onCategoryClick('')}>
            All Products
          </li>
        </ul>
      </div>
      {categories.map((category, index) => (
        <div className='sidebar-menu' key={index}>
          <ul>
            <li onClick={() => onCategoryClick(category)}>
              {category}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
