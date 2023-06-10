const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/user');
const Product = require('../models/product');
const Contract = require('../models/contract');
const { contractABI } = require('../utils/contract-artifacts');

const resetAndSeedDatabase = async () => {
    mongoose
        .connect(process.env.DB_URL)
        .then(async () => {
            console.log("Connected to mongoDB.\n");

            const collections = mongoose.connection.collections;
            for (const collectionName in collections) {
                await collections[collectionName].deleteMany({});
                console.log(`Dropped collection: ${collectionName}`);
            }

            await seedDatabase();
            await mongoose.disconnect();
        })
        .catch((error) => {
            throw error;
        });
}

const seedDatabase = async () => {
    const addresses = [
        '0x9f5d0535cc0d2b02672978c560d0e28c6c5ba663',
        '0x75f53f5b7cB06AAFb05A09ac7cEF0FfF9c2Fef89'
    ];
    const username = 'Unnamed';

    const users = addresses.map((address) => ({
        address,
        username
    }));
    await User.insertMany(users);

    const owner = await User.findOne({ address: users[0].address });
    
    await Contract.insertMany([{
        address: process.env.CONTRACT_ADDRESS,
        abi: contractABI,
        user_id: owner._id
    }]);

    console.log("Seeding database finished!");
}

module.exports = { resetAndSeedDatabase }