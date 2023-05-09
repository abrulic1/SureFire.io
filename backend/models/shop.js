const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const shopSchema = new mongoose.Schema({
   address: {type: String, required: true, unique: true},
   owner: {type: mongoose.Types.ObjectId, required: true, ref: 'User'}
});

shopSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Shop', shopSchema);