import { useState } from 'react';
import '../Style/addProducts.css';
import axios from 'axios';

const AddProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("None");
  const [category, setCategory] = useState("None");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !price || category === "None" || brand === "None" || !image) {
      setError("Please fill in all the fields correctly.");
      return;
    }

    const userId = JSON.parse(localStorage.getItem("user")).user._id;
    console.log(userId);
    const formData = new FormData()
    formData.append('name', name);
    formData.append('price', price);
    formData.append('brand', brand);
    formData.append('category', category);
    formData.append('image', image);
    formData.append('userId', userId);

    try {
      const res = await axios.post('http://localhost:3000/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res);
      setName('');
      setPrice('');
      setBrand('None');
      setCategory('None');
      setImage('');
      alert('Product Uploaded Successfully !!');
    } catch (err) {
      setError('Failed to upload product. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="addproducts-wrapper">
      <div className="addproducts-form">
        <div className="addproducts-heading">
          <h2>Add Products</h2> <br />
          <p>Enter your product details to upload</p> <br />
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              placeholder="Enter product name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              placeholder="Enter product price..."
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label>
            Image:
            <input
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <div>
            <label id='brand-label'>
              Brand:
              <select id="select1" value={brand} onChange={(e) => setBrand(e.target.value)}>
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
            <label id='category-label'>
              Category:
              <select id="select2" value={category} onChange={(e) => setCategory(e.target.value)}>
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
          <button type="submit">Add Product</button>
          {error && <div className="error-mssg">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
