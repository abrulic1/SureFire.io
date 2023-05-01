const express = require('express');
const bodyParser = require('body-parser');
const mongoPractice = require('./mongo');
const depolySC = require('./deploySC');
const app = express();
app.use(bodyParser.json());

app.post('/products', mongoPractice.createProduct);
app.post('/users', mongoPractice.createUser);
app.get("/", () => {
    console.log("uslo")
})
app.post("/smart-contract", () => {
    console.log("Doslo")
    depolySC();
})
app.listen(5000);