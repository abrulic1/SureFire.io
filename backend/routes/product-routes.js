const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');
const Product = require('../models/product')
const { connectToDb } = require('../utils/connectToDb');
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

router.get('/product/', async (req, res, next) => {
    const name = (req.query.name).toUpperCase();
    console.log("ime je: ", name)
    const products = await Product.find({ normalizedName: name });
    console.log("Proizvodi su: ", products);
    console.log('Get route in products to get products by name from QUERY');
    res.json({ products });
});


router.post('/add-product', productController.addProduct);


module.exports = router;