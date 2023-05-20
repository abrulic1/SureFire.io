const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order-controller');
const { connectToDb } = require('../utils/connectToDb');
connectToDb();


router.post('/order', orderController.addOrder);
router.get('/order/:user_id', orderController.getOrderByUser);
// router.post('/orders/:user_id', orderController.updateOrder);

module.exports = router;