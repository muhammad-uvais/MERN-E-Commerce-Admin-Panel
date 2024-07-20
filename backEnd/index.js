const express = require('express');
const cors = require('cors');
const User = require('./models/user');
const Product = require('./models/product');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4000;
const privateKey = process.env.Private_Key;
require('./configuration/mongooseConnection');

app.use(express.json());
app.use(cors());
app.use(express.static ('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public/Images'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/;
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const isExtensionValid = allowedFileTypes.test(fileExtension);
    const isMimeTypeValid = allowedFileTypes.test(file.mimetype);
    if (isMimeTypeValid && isExtensionValid) {
        return cb(null, true);
    } else {
        return cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
});

app.post('/products', upload.single('image'), async (req, res) => {
    try {
        const { name, price, brand, category, userId } = req.body;
        const image = req.file ? req.file.filename : null;
        if (!image) {
            return res.status(400).json({ error: 'Image is required' });
        }
        const product = new Product({ name, price, brand, category, image, userId });
        const data = await product.save();
        res.status(201).json(data);
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email , password: hashedPassword });
        const data = await user.save();
        const payload = {
            id: data.id,
            name: data.name
        };
        const token = jwt.sign(payload, privateKey , { expiresIn: '1h' });
        console.log(token);
        res.status(201).json({data , token});
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/getproducts', async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length > 0) {
            res.json(products);
        } else {
            res.status(404).json({ result: 'No products found' });
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/getproducts/:category', async (req, res) => {
    const category = req.params.category;
    try {
        const products = await Product.find({ category: category });
        if (products.length > 0) {
            res.json(products);
        } else {
            res.status(404).json({ result: 'No products found for this category' });
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product' });
    }
});

app.put('/product/:id', upload.single('image'), async (req, res) => {
    try {
        const { name, price, brand, category } = req.body;
        const image = req.file ? req.file.filename : null;

        const updatedProductData = { name, price, brand, category };
        if (image) {
            updatedProductData.image = image;
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedProductData, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Error updating product' });
    }
});

app.delete('/product/:id', async (req, res) => {
    try {
        const result = await Product.deleteOne({ _id: req.params.id });
        res.send(result);
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Error deleting product' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
