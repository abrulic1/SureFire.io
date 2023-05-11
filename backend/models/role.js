const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const roleSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  normalizedName: { type: String, unique: true}
});

roleSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Role", roleSchema);
