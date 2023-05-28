const User = require('../models/user');

const getUserByAddress = async (req, res) => {
    try {
        const users = await User.find();
        users.forEach((u) => {
            console.log(u.address);
        });
        const user = users.find((u) => u.address.toLowerCase() == req.query.address.toLowerCase());
        if (user)
            res.status(200).json(user);
        else
            return res.status(404).json({ error: 'User not found' });
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