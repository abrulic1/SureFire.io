const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contract-controller');
const { connectToDb } = require('../utils/connect-to-database');
connectToDb();


router.get('/contract-artifacts', contractController.getContractArtifacts);
module.exports = router;