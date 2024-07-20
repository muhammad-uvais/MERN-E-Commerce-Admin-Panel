import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Style/addProducts.css';

const UpdateProducts = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: null,
    brand: 'None',
    category: 'None'
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/product/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setProduct(prevState => ({
      ...prevState,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('brand', product.brand);
    formData.append('category', product.category);
    if (product.image) {
      formData.append('image', product.image);
    }

    try {
      const response = await axios.put(`http://localhost:3000/product/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      navigate('/profile');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="addproducts-wrapper">
      <div className="addproducts-form">
        <div className="addproducts-heading">
          <h2>Update Products</h2> <br />
          <p>Enter your product details to update</p> <br />
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder="Enter product name..."
              value={product.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              placeholder="Enter product price..."
              value={product.price}
              onChange={handleChange}
            />
          </label>
          <label>
            Image:
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
            />
          </label>
          <div>
            <label id="brand-label">
              Brand:
              <select
                id="select1"
                name="brand"
                value={product.brand}
                onChange={handleChange}
              >
                <option value="None">None</option>
                <option value="Samsung">Samsung</option>
                <option value="Dell">Dell</option>
                <option value="Lenovo">Lenovo</option>
                <option value="Hp">Hp</option>
                <option value="Boat">Boat</option>
                <option value="Apple">Apple</option>
                <option value="Xiaomi">Xiaomi</option>
                <option value="Canon">Canon</option>
                <option value="Nikon">Nikon</option>
                <option value="Sony">Sony</option>
              </select>
            </label>
            <label id="category-label">
              Category:
              <select
                id="select2"
                name="category"
                value={product.category}
                onChange={handleChange}
              >
                <option value="None">None</option>
                <option value="Laptop">Laptop</option>
                <option value="Mobile">Mobile</option>
                <option value="Earphone">Earphone</option>
                <option value="Tablet">Tablet</option>
                <option value="Camera">Camera</option>
              </select>
            </label>
          </div>
          <br />
          <button type="submit">Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProducts;
