const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contract-controller');
const { connectToDb } = require('../utils/connectToDb');
connectToDb();

router.post('/create-shop', contractController.createShop);
router.post('/add-admin', contractController.addAdmin);
module.exports = router;