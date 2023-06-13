const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction-controller');
const { connectToDb } = require('../utils/connect-to-database');
connectToDb();


router.post('/save-transaction', transactionController.saveTransaction);

module.exports = router;