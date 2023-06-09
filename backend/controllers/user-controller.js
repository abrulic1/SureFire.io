const User = require('../models/user');

const getUserByAddress = async (req, res) => {
    try {
        const users = await User.find({});
        const user = users.find((u) => u.address.toLowerCase() == req.query.address.toLowerCase());
        if (user)
            return res.status(200).json(user);
        else
            return res.status(404).json(null);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const getUserById = async (req, res) => {
    console.log("user params ", req.params.user_id);
    try {
        const user = await User.findById(req.params.user_id);
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
    }
}

const getById = async (user_id) => {
    try {
        const user = await User.findById(user_id);
        return user;
    } catch (err) {
        console.error(err);
        throw new Error('Error retrieving user by ID');
    }
}

const addUser = async (req, res) => {
    try {
        const users = await User.find();
        const user = users.find((u) => u.address.toLowerCase() == req.body.address.toLowerCase());
        if (user==null || user=='undefined') {
            const { address, username } = req.body;
            const newUser = new User({
                address,
                username
            });
            await newUser.save();
            return res.status(200).json({ success: true, message: 'User added successfully', user: newUser });
        }
        return res.status(404).json({ success: false, message: 'This user is already in database.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Failed to add user.' });
    }
}


exports.getUserByAddress = getUserByAddress;
exports.getById = getById;
exports.addUser = addUser;
exports.getUserById = getUserById;