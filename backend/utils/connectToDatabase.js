const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) return;

  mongoose
    .connect(process.env.DB_URL)
    .then((res) => {
      console.log("Connected to mongoDB.");
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = { connectToDatabase };
