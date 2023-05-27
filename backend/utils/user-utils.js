const User = require('../models/user');

const getByAddress = async (address) => {
  try {
    const users = await User.find();
    const user = users.filter((u) => u.address.toLowerCase() == address.toLowerCase());
        console.log("usessrre ", user);
      return user;
    } catch (err) {
      throw new Error('Unable to get user by address from database');
    }
}

const getById = async (id) => {
     try {
         const user = await User.findById(id);
      return user;
    } catch (err) {
      throw new Error('Unable to get user by ID from database');
    }
}


exports.getByAddress = getByAddress;
exports.getById = getById;