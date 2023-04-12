const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: {type: String, required: true},    
    name: {type: String, required: true},
    price: {type: Number, required: true},
    owner: {type: String, required: true}
});


module.exports = mongoose.model('Product', productSchema);