const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const { connectToDb } = require('../utils/connect-to-database');
connectToDb();

router.get('/user', userController.getUserByAddress);
router.get('/get-user/:user_id', userController.getUserById);
router.post('/add-user', userController.addUser);
module.exports = router;