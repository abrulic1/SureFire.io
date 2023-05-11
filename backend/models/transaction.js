const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const transactionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }
    // from: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true
    // },
    // to: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true
    // }
  },
  { timestamps: true }
);


transactionSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Transaction', transactionSchema);