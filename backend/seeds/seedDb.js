const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/user');
const Product = require('../models/product');
const Role = require('../models/role');
const Shop = require('../models/shop');
const Transaction = require('../models/transaction');
const UserOrder = require('../models/user_order');
const UserRole = require('../models/user_role');

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
    .then( async (res) => {
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
                            "image": "https://upload.wikimedia.org/wikipedia/commons/a/af/Glasses_black.jpg",
                            "name": "Glasses",
                            "normalizedName": "GLASSES",
                            "price": 0.5,
                            "owner": foundUser
                        },
                        {
                            "image": "https://upload.wikimedia.org/wikipedia/commons/a/af/Glasses_black.jpg",
                            "name": "UNO Cards",
                            "normalizedName": "UNO CARDS",
                            "price": 1,
                            "owner": foundUser
                        },
                        {
                            "image": "https://www.energysistem.com/cdnassets/products/45305/principal_2000.jpg",
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
                    await UserOrder.deleteMany({});
                    await UserOrder.insertMany([]);

                  // Disconnect from the database when done
                 //  mongoose.disconnect();
                    console.log("Disconnected!");
                }).catch(err => { throw err });
                2
                
            }).
            catch( err => console.log(err));
    })
    .catch((error) => {
      throw error;
    });

}

module.exports = {DbConnection}