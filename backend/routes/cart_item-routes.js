const express = require('express');
const router = express.Router();
const { connectToDb } = require('../utils/connect-to-database');
const { addCartItem, getUserItems } = require('../controllers/cart_item-controller');
connectToDb();


router.post('/add-item', addCartItem);
router.get('/get-user-items/', getUserItems);
module.exports = router;