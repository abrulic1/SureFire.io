const User = require('../models/user');


const getUserByAddress = async (req, res) => {
    try {
        const user = await User.find({ address: req.query.address });
        if (user.length==0) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log("getUserByAddress")
        console.log(user);
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const getById = async (user_id) => {
    try {
        const user = await User.findById(user_id);
        return user;
      } catch (err) {
        console.error(err);
        throw new Error('Error retrieving user by ID');
      }
}


exports.getUserByAddress = getUserByAddress;
exports.getById = getById;