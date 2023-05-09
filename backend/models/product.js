const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: {type: String, required: true},    
    name: {type: String, required: true},
    price: {type: Number, required: true},
    owner: {type: mongoose.Types.ObjectId, required: true, ref: 'User'}
});


module.exports = mongoose.model('Product', productSchema);