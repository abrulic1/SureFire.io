const express = require('express');
const Web3 = require('web3');
const CreateShop = require('./build/contracts/CreateShop.json');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const web3 = new Web3('http://localhost:8545');
app.use(bodyParser.json());
const { options } = require('./swagger');

//  require('./utils/mongo-seed');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

const { DbConnection } = require('./seeds/seedDb');
 DbConnection();

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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));