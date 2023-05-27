const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order-controller');
const { connectToDb } = require('../utils/connectToDb');
connectToDb();


router.post('/order', orderController.addOrder);
router.get('/order/:user_id', orderController.getOrderByUserId);
router.put('/order/:order_id', orderController.updateOrder);
router.get('/:user_id/orders', orderController.getUserOrders);
// router.get('/', orderController.getAllOrders);
module.exports = router;