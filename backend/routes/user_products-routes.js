const express = require('express');
const router = express.Router();
const { connectToDb } = require('../utils/connect-to-database');
const { getOwner, getUserProducts, getProductsWhereOwnerIsNot, getAllProducts } = require('../controllers/user_products-controller');
connectToDb();

router.get('/products-of/', getUserProducts);
router.get('/owner-of/:product_id', getOwner);
router.get('/products/', getProductsWhereOwnerIsNot);
router.get('/', getAllProducts);
module.exports = router;