const User = require('../models/user');

const getByAddress = async (address) => {
    // try {
    //     const user = await User.findOne({ address: "0x9F5d0535cC0D2B02672978c560d0E28C6C5BA663" })
    //     console.log("usessrre ", user);
    //   return user;
    // } catch (err) {
    //   throw new Error('Unable to get user by address from database');
    // }
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