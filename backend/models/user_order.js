const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userOrdersSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }]
})


userOrdersSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User_Orders', userOrdersSchema);