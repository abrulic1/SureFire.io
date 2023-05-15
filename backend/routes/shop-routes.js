const express = require('express');
const router = express.Router();
const Shop = require('../models/shop');
const { connectToDb } = require('../utils/connectToDb');
const { getSmartContract } = require('../utils/getSmartContract');
 connectToDb();

router.get('/', async (req, res) => {
    // const products = await Product.find({});
    const contract = getSmartContract();
    res.json(contract);
})

module.exports = router;