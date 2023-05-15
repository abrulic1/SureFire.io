const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');
const Product = require('../models/product')
const { connectToDb } = require('../utils/connectToDb');
connectToDb();

router.get('/', productController.getAllProducts);

router.get('/products/:id', productController.getProductById);
  

router.get('/products/', async (req, res, next) => {
    const name = (req.query.name).toUpperCase();
    console.log("ime je: ", name)
    const products = await Product.find({ normalizedName: name });
    console.log("Proizvodi su: ", products);
    console.log('Get route in products to get products by name from QUERY');
    res.json({ products });
});


module.exports = router;