const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/product');
const User = require('./models/role');

const url = process.env.DB_URL;

mongoose.connect(url).then(()=>{console.log('Connected to database!')})
.catch(()=>{console.log('Connection failed!')});

const createProduct = async (req, res, next) => {
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price
    });
    const result = await newProduct.save();
    res.json(result);
}
    
const createUser = async(req, res, next) => {
    const newUser = new User({
        address: req.body.address,
        shop: req.body.shop
    });

    const result = await newUser.save();
    res.json(result);
}
const getProducts = async (res, req, next) => {

};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
exports.createUser = createUser;