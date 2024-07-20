const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    brand: String,
    category: String,
    userId: String
});

const productModel = mongoose.model('products', productSchema);

module.exports = productModel;

