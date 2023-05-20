const express = require('express');
// const Web3 = require('web3');
// const CreateShop = require('./build/contracts/CreateShop.json');
const bodyParser = require('body-parser');
// const swaggerJSDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');
const { DbConnection } = require('./seeds/seedDb');
DbConnection();
const productRoutes = require('./routes/product-routes');
const orderRoutes = require('./routes/order-routes');
const userRoutes = require('./routes/user-routes');
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requsted-Witth, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();

})

app.use('/api/products/', productRoutes);
app.use('/api/orders/', orderRoutes);
app.use('/api/users/', userRoutes);

/*
const router = express.Router();

const web3 = new Web3('http://localhost:8545');
app.use(bodyParser.json());
const { options } = require('./swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

*/



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));