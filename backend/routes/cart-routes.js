const express = require('express');
const router = express.Router();
const { connectToDb } = require('../utils/connect-to-database');
const cartController = require('../controllers/cart-controller');
connectToDb();

router.get('/check-cart/:user_id', cartController.checkCart);
router.post('/create-cart', cartController.createCart);
router.get('/get-cart/', cartController.getCart); 
module.exports = router;