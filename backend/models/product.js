const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({    
    name: {
        type: String,
        require: true
    },
    normalizedName: {
        type: String,
        require: true
    },
    image: {
        type: Buffer,
        require: true
    },
    description: {
        type: String,
        default: ""
    },
    price: {
        type: Number, 
        required: true
    },
    stock: {
        type: Number, 
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
});


module.exports = mongoose.model('Product', productSchema);