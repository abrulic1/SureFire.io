const mongoose = require('mongoose');
require('dotenv').config();

const resetDatabase = async () => {
    mongoose
        .connect(process.env.DB_URL)
        .then(async () => {
            console.log("Connected to mongoDB.\n");

            const collections = mongoose.connection.collections;
            for (const collectionName in collections) {
                await collections[collectionName].deleteMany({});
                console.log(`Dropped collection: ${collectionName}`);
            }
        })
        .catch((error) => {
            throw error;
        });
}


module.exports = { resetDatabase }