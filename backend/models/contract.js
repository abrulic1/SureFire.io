const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const contractSchema = new mongoose.Schema({
    owner: {
        type: String,
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
    },
    admins: {
        type: [{
            type: String,
            required: true,
            unique: true
        }],
        validate: {
            validator: function(arr) {
                return arr.length === new Set(arr).size;
            },
            message: 'Admins array must contain unique values.'
        }
    }
})


contractSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Contract', contractSchema);