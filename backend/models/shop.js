const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
   address: {type: String, required: true, unique: true},
   owner: {type: String, required: true, unique: true}
});


module.exports = mongoose.model('Shop', shopSchema);