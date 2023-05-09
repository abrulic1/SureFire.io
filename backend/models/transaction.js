const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    status: { type: String, required: true, default: "Success" },
  },
  { timestamps: true }
);

const Transaction = mongoose.models.transaction || mongoose.model("Transaction", transactionSchema);

module.exports = {Transaction};