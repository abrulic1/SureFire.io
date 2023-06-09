const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const transactionSchema = new mongoose.Schema(
  {
    hash: {
      type: String,
      required: true,
      unique: true
    },
    url: {
      type: String,
      required: true,
      unique: true
    },
    from: {
      type: String,
      required: true
    },
   to: {
    type: String,
    required: true
    },
    user_address: {
      type: String,
      required: true
    },
    user_info: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    affirmed: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);