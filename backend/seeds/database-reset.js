const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/user');
const Product = require('../models/product');
const Shop = require('../models/shop');
const Contract = require('../models/contract');
const { contractABI } = require('../utils/compileContract');

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
        '0x2cc4f4A8615DD8e24ec9E45f29077E0c645B8191',
        '0xa2A170731f4b66b95a680550d2fF97d11D8B7572',
        '0x9f20cb346Ce1402ACCA0a1Fa3d26FC0DfE2D3F03',
        '0x9f5d0535cc0d2b02672978c560d0e28c6c5ba663',
        '0x75f53f5b7cB06AAFb05A09ac7cEF0FfF9c2Fef89'
    ];
    const username = 'Unnamed';

    const users = addresses.map((address) => ({
        address,
        username
    }));
    await User.insertMany(users);

    const owner = await User.findOne({ address: users[3].address });

    //BITNO: Ovo nekad popravit, csv file il nest ubacit umjesto ovog
    const products = [
        {
            "name": "Glasses",
            "normalizedName": "GLASSES",
            "image": "https://miro.medium.com/v2/resize:fit:670/0*iXFSD9fZ-AD73K3P.jpg",
            "description": "Very cute glasses",
            "price": 1,
            "stock": 1,
            "owner": owner._id
        },
        {
            "name": "UNO Cards",
            "normalizedName": "UNO CARDS",
            "image": "https://gibbonsgazette.org/wp-content/uploads/2022/04/43YAWLITTZJLZIQTCP2JSS4KSM.jpg",
            "description": "Some desc",
            "price": 1,
            "stock": 1,
            "owner": owner._id
        },
        {
            "name": "Headphones",
            "normalizedName": "HEADPHONES",
            "image": "https://www.marketsmithinc.com/wp-content/uploads/2022/05/latest-1.jpg",
            "description": "Descriptiooon",
            "price": 1,
            "stock": 1,
            "owner": owner._id
        },
        {
            "name": "Headphones",
            "normalizedName": "HEADPHONES",
            "image": "https://theithacan.org/wp-content/uploads/2022/02/2.8-Cartoon_MikeRoss-3.jpg",
            "description": "Descriptiooon",
            "price": 1,
            "stock": 1,
            "owner": owner._id
        },
        {
            "name": "Headphones",
            "normalizedName": "HEADPHONES",
            "image": "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg",
            "price": 1,
            "stock": 1,
            "owner": owner._id
        }
    ];
    await Product.insertMany(products);
    //BITNO: Ove sve proizvode moram dodati i na Ethereum tkd ovdje negdje treba poziv te metode da sacuva jednom sve na ETH ili napraviti skriptu da se samo jednom pokrene rucno prije deploymenta da ne ide kroz kod...

    await Contract.insertMany([{
        address: process.env.CONTRACT_ADDRESS,
        abi: contractABI,
        user_id: owner._id
    }]);

    console.log("Seeding database finished!");
}



module.exports = { resetAndSeedDatabase }