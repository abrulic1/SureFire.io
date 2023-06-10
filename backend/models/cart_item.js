const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const cartItemSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        require: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true
    }
})


cartItemSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Cart_Items', cartItemSchema);