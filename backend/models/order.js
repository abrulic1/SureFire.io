const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    buyer: {type: String, required: true},
    seller: {type: String, required: true},
    transaction: {type: String, required: true, unique: true}
})

module.exports = mongoose.model('Order', orderSchema);