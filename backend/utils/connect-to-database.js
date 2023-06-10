const mongoose = require("mongoose");
require("dotenv").config();

const connectToDb = async () => {
  if (mongoose.connections[0].readyState) return;

  mongoose
    .connect(process.env.DB_URL)
    .then((res) => {
      console.log("Connected to mongoDB /utils/connectToDb.js!");
    })
    .catch((error) => {
      console.log('Error: Unable to connect to database!');
      throw error;
    });
};

module.exports = { connectToDb };
