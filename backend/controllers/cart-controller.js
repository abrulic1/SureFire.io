const Cart = require('../models/cart');


const checkCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user_id: req.params.user_id });
        if (cart)
            res.status(200).json(cart);
        else
            res.status(200).json(null);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving cart' });
    }
}

const createCart = async (req, res) => {
    const cart = new Cart({
        user_id: req.query.user_id
    });
    cart.save();
    res.json(cart);
}

const getCart = async (req, res) => {
    const { user_id } = req.query;
    const cart = await Cart.findOne({ user_id: user_id });
    if (cart)
        return res.status(200).json(cart);
    else
        return res.status(400).json(null);
}

exports.checkCart = checkCart;
exports.createCart = createCart;
exports.getCart = getCart;