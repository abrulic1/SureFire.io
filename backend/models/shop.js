const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const shopSchema = new mongoose.Schema({
   user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true
   },
   contract_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contract',
      require: true
   }

});

shopSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Shop', shopSchema);