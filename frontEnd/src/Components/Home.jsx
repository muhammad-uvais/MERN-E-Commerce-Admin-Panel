import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import axios from 'axios';
import '../Style/home.css';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (category = '') => {
    try {
      const url = category ? `http://localhost:3000/getproducts/${category}` : 'http://localhost:3000/getproducts';
      const res = await axios.get(url);
      setProducts(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className='home-wrapper'>
      <div className='sidebar-wrapper'>
        <SideBar onCategoryClick={fetchProducts} />
      </div>

      
      <div className='product-wrapper'>
        {products.map((product, index) => (
          <div key={index} className='product-item'>
            <div className="product-image">
                <img src={`http://localhost:3000/Images/${product.image}`} alt={product.name} />
            </div>
            <h3>Name : {product.name}</h3>
            <p>Price :{product.price}</p>
            <p>Category: {product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
