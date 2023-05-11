const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const userRoleSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    roles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true
    }]
});
  
userRoleSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User_Roles", userRoleSchema);
