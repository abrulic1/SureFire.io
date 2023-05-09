const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    buyer: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    seller: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    transaction: {type: mongoose.Types.ObjectId, required: true, ref: 'Transaction'}
})

module.exports = mongoose.model('Order', orderSchema);