const express = require('express');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const productRoutes = require('./routes/product-routes');
const userRoutes = require('./routes/user-routes');
const contractRoutes = require('./routes/contract-routes');
const { options } = require('./config/swagger');
const app = express();
const fileUpload = require('express-fileupload');

app.use(fileUpload());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requsted-Witth, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();

})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
app.use('/api/products/', productRoutes);
app.use('/api/users/', userRoutes);
app.use('/api/contracts/', contractRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));