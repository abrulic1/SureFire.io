const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        require: true
    }
})


cartSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Cart', cartSchema);