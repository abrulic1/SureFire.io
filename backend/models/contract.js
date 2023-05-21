const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const contractSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        require: true
    },
    address: {
        type: String,
        unique: true,
        require: true
    },
    abi: {
        type: Object,
        require: true
    }
})


contractSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Contract', contractSchema);