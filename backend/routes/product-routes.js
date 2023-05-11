const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const { connectToDb } = require('../utils/connectToDb');
 connectToDb();

const DUMMY_PRODUCTS = [
    {
        "image": "https://upload.wikimedia.org/wikipedia/commons/a/af/Glasses_black.jpg",
        "name": "glasses",
        "price": 0.5,
        "owner": "0x2cc4f4A8615DD8e24ec9E45f29077E0c645B8191"
    },
    {
        "image": "https://cdn.shopify.com/s/files/1/0600/0141/9429/products/mkk8rbos1irj5lrwk2bg_34c32152-3fb7-4d63-85ed-278599be0348.jpg?v=1678825385",
        "name": "uno cards",
        "price": 1,
        "owner": "0x2cc4f4A8615DD8e24ec9E45f29077E0c645B8191"
    },
    {
        "image": "https://www.energysistem.com/cdnassets/products/45305/principal_2000.jpg",
        "name": "headphones",
        "price": 1,
        "owner": "0x2cc4f4A8615DD8e24ec9E45f29077E0c645B8191"
    }
];

router.get('/', async (req, res) => {
    const products = await Product.find({});
    console.log("Proizvodi su: ", products);
    console.log('Get route to return all products');
    // res.json({ products: products.map( user => user.toObject({getters: true})) }); 
    res.json(products);
})


router.get('/products/', async (req, res, next) => {
    const name = (req.query.name).toUpperCase();
    console.log("ime je: ", name)
    const products = await Product.find({ normalizedName: name});
    console.log("Proizvodi su: ", products);
    console.log('Get route in products to get products by name from QUERY');
    res.json({ products }); 
})

router.get('/products/:name', (req, res, next) => {
    const name = req.params.name.toLowerCase();
    const place = DUMMY_PRODUCTS.find(p => { return p.name === name });
    console.log('Get route in products to get products by name from PARAMS');
    res.json({ place }); 
});


module.exports = router;