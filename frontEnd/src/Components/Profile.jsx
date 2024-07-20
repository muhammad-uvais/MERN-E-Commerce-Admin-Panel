import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/profile.css';
import axios from 'axios';

const Profile = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/getproducts');
      setProducts(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/product/${id}`);
      if (res.status === 200) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.brand.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='profile-wrapper'>
      <div className='input-box'>
        <input
          type="text"
          placeholder='Search...'
          id='search-input'
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus="none"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <h1>Currently there are no products</h1>
      ) : (
        <div className="product-wrapper">
          {filteredProducts.map((product) => (
            <div className="product-item" key={product._id}>
              <div className="product-image">
                <img src={`http://localhost:3000/Images/${product.image}`} alt={product.name} />
              </div>
              <div className="product-details">
                <h2>{product.name}</h2>
                <p>Brand: {product.brand}</p>
                <p>Category: {product.category}</p>
                <p>Price: ${product.price}</p>
                <div className="del-upd-buttons">
                  <button onClick={() => deleteProduct(product._id)}>Delete</button>
                  <button onClick={() => navigate(`/update/${product._id}`)}>Update</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

  );
};

export default Profile;
