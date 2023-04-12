const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    address: {type: String, required: true, unique: true},
    shop_address: {type: String, unique: true, default: null},
    buyer: {type: Boolean, default: true},
    seller: {type: Boolean, default: false}
})

module.exports = mongoose.model('Role', roleSchema);