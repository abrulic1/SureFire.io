const mongoose = require("mongoose");
require("dotenv").config();

const connectToDb = async () => {
  if (mongoose.connections[0].readyState) return;

  mongoose
    .connect(process.env.DB_URL)
    .then((res) => {
      console.log("Connected to mongoDB connectToDb.js file");
    })
    .catch((error) => {
      console.log('DESIO SE ERROR U KONEKCIJI');
      throw error;
    });
};

module.exports = { connectToDb };
