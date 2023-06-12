const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userProductSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    product_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }]
});


userProductSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User_Products', userProductSchema);