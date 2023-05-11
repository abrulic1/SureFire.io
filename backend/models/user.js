const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  address: { type: String, unique: true, required: true }
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);