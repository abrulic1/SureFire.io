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
        require: true
    },
    stock: {
        type: Number, 
        require: true
    }
});

module.exports = mongoose.model('Product', productSchema);