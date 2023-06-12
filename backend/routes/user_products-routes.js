const express = require('express');
const router = express.Router();
const { connectToDb } = require('../utils/connect-to-database');
const { getOwner } = require('../controllers/user_products-controller');
connectToDb();


router.get('/owner-of/:product_id', getOwner);
module.exports = router;