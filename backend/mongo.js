const mongoose = require('mongoose');
const Product = require('./models/product');
const User = require('./models/role');

const url = 'mongodb+srv://abrulic1:novipass123@cluster0.ji7sq6r.mongodb.net/probaopet?retryWrites=true&w=majority';

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
        shop_address: req.body.shop_address
    });

    const result = await newUser.save();
    res.json(result);
}
const getProducts = async (res, req, next) => {

};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
exports.createUser = createUser;