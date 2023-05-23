const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/user');
const Product = require('../models/product');
const Role = require('../models/role');
const Shop = require('../models/shop');
const Transaction = require('../models/transaction');
const Order = require('../models/order');
const UserRole = require('../models/user_role');
const Contract = require('../models/contract');
const { contractABI } = require('../utils/compileContract');

const url = process.env.DB_URL;
const users = [
    {
        "address": "0x2cc4f4A8615DD8e24ec9E45f29077E0c645B8191"
    },
    {
        "address": "0xa2A170731f4b66b95a680550d2fF97d11D8B7572"
    },
    {
        "address": "0x9f20cb346Ce1402ACCA0a1Fa3d26FC0DfE2D3F03"
    },
    {
        "address": "0x9f5d0535cc0d2b02672978c560d0e28c6c5ba663"
    }
];
const roles = [
    {
        "name": "Seller",
        "normalizedName": "SELLER"
    },
    {
        "name": "Buyer",
        "normalizedName": "BUYER"
    }
];



const DbConnection = async () => {
    // if (mongoose.connections[0].readyState) return;

    mongoose
        .connect(process.env.DB_URL)
        .then(async (res) => {
            console.log("Connected to mongoDB.\n");
            // mongoose.connection.db.dropDatabase();

            await User.deleteMany({});
            //  console.log("Useri uspjesno obrisani!")
            User.insertMany(users).then(insertedUsers => {
                console.log(`Inserted ${insertedUsers.length} users`);

                // Find a user by _id
                const userId = insertedUsers[0]._id;
                User.findById(userId).then(async foundUser => {
                    console.log(`Found user: ${foundUser}`);

                    const shops = [
                        {
                            "address": "0xa399b55B84f06381322278AD384F1B05C1088287",
                            "owner": foundUser
                        }
                    ];

                    const products = [
                        {
                            "image": "https://miro.medium.com/v2/resize:fit:670/0*iXFSD9fZ-AD73K3P.jpg",
                            "name": "Glasses",
                            "normalizedName": "GLASSES",
                            "price": 0.5,
                            "owner": foundUser
                        },
                        {
                            "image": "https://gibbonsgazette.org/wp-content/uploads/2022/04/43YAWLITTZJLZIQTCP2JSS4KSM.jpg",
                            "name": "UNO Cards",
                            "normalizedName": "UNO CARDS",
                            "price": 1,
                            "owner": foundUser
                        },
                        {
                            "image": "https://www.marketsmithinc.com/wp-content/uploads/2022/05/latest-1.jpg",
                            "name": "Headphones",
                            "normalizedName": "HEADPHONES",
                            "price": 1,
                            "owner": foundUser
                        },
                        {
                            "image": "https://theithacan.org/wp-content/uploads/2022/02/2.8-Cartoon_MikeRoss-3.jpg",
                            "name": "Headphones",
                            "normalizedName": "HEADPHONES",
                            "price": 1,
                            "owner": foundUser
                        },
                        {
                            "image": "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg",
                            "name": "Headphones",
                            "normalizedName": "HEADPHONES",
                            "price": 1,
                            "owner": foundUser
                        }
                    ];
                    await Role.deleteMany({});
                    await Role.insertMany(roles);
                    await Shop.deleteMany({});
                    await Shop.insertMany(shops);
                    await Product.deleteMany({});
                    await Product.insertMany(products);
                    await Transaction.deleteMany({});
                    await Transaction.insertMany([]);
                    await UserRole.deleteMany({});
                    await UserRole.insertMany([]);
                    await Order.deleteMany({});
                    const userId = await User.findOne({}, '_id');
                    const productId =await Product.findOne({}, '_id');
                    await Order.insertMany([{
                        user: userId,
                        product: productId
                    }]);
                    await Contract.deleteMany({});
                    await Contract.insertMany([{
                        owner: process.env.OWNER_PUBLIC_KEY,
                        address: process.env.CONTRACT_ADDRESS,
                        abi: contractABI,
                        admins: [process.env.OWNER_PUBLIC_KEY]
                    }]);


                    console.log("Seeding database finished!");
                }).catch(err => { throw err });
                2

            }).
                catch(err => console.log(err));
        })
        .catch((error) => {
            throw error;
        });

}

module.exports = { DbConnection }