const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();
const Transaction = require('../models/transaction');

const url = process.env.DB_URL;
const transactions = JSON.parse(fs.readFileSync(`${__dirname}/_seedData/transactions.json`,'utf-8'));

mongoose.connect(url).then(() => {
    console.log('Mongo connection open!');
}).catch((error) => {
    console.log("Unable to connect");
    console.error(error);
})

const seedDB = async () => {
    //await Transaction.deleteMany({});
    //await Transaction.insertMany(transactions);
}

seedDB().then(() => {
    mongoose.connection.close();
})

