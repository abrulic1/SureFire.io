const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const { connectToDb } = require('../utils/connectToDb');
connectToDb();

router.get('/user', userController.getUserByAddress);
module.exports = router;