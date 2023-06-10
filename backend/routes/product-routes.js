const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');
const Product = require('../models/product')
const { connectToDb } = require('../utils/connect-to-database');
connectToDb();

/**
 * @swagger
 * /api/products/:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Failed to get products from database
 *       500: 
 *         description: Server error. Check console for more informations
 */
router.get('/', productController.getAllProducts);


/**
 * @swagger
 * /api/products/product/{id}:
 *   get:
 *     summary: Get product by ID
 *     description: Retrieve a product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '404':
 *         description: Error
 */

router.get('/product/:id', productController.getProductById);
router.get('/:owner_address', productController.getProductsByOwnerAddress);
router.post('/add-product', productController.addProduct);
router.post('/:product_id/purchase', productController.purchaseProduct);


module.exports = router;