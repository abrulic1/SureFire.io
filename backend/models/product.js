const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: {type: String, require: true},    
    name: { type: String, require: true },
    normalizedName: {type: String, require: true},
    price: {type: Number, require: true},
    owner: {type: mongoose.Types.ObjectId, require: true, ref: 'User'}
});


module.exports = mongoose.model('Product', productSchema);