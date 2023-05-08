const express = require('express');
const Web3 = require('web3');
const CreateShop = require('./build/contracts/CreateShop.json');
const bodyParser = require('body-parser');
const mongoPractice = require('./mongo');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const web3 = new Web3('http://localhost:8545');
app.use(bodyParser.json());
const { options } = require('./swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Welcome endpoint
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: OK
 */
app.get('/hello', (req, res) => {
  res.send('Welcome');
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Users endpoint
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: OK
 */
app.post('/users', mongoPractice.createUser);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Products endpoint
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: OK
 */
app.post('/products', mongoPractice.createProduct);


const createShop = new web3.eth.Contract(
  CreateShop.abi,
  '0x812Ef74cfEEf3C3b88aaec83924b27479D2965ee'
);

/**
 * @swagger
 * /addProduct:
 *   post:
 *     summary: Add a new product to the marketplace
 *     requestBody:
 *       description: JSON object containing details of the product to add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Product added successfully
 *       '400':
 *         description: Bad request - missing or invalid parameters
 *       '500':
 *         description: Internal server error
 */
app.post('/addProduct', async (req, res) => {
  const { name, description, price, stock } = req.body;
  if (!name || !price || !stock) {
    return res.status(400).send('Invalid request: name and price query parameters required');
  }
  try {
    const result = await createShop.methods
      .addProduct(name, description, web3.utils.toWei(price.toString(), 'ether'), 5)
      .send({ from: web3.eth.accounts.wallet[0].address });   //Ne radi
    console.log('Transaction hash:', result.transactionHash);
    res.send('Product created successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating product');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));