const User_Products = require('../models/user_product');

const addUserProduct = async (owner_id, product_id) => {
    const products = await User_Products.find({ user_id: owner_id });

    if (products.length == 0) {
        const newUserProduct = new User_Products({
            user_id: owner_id,
            product_id: [product_id]
        });
        newUserProduct.save();
    }
    else {
        const updatedUserProducts = await User_Products.findOneAndUpdate(
            { user_id: owner_id },
            { $addToSet: { product_id: product_id } },
            { new: true }
        );

    }
}


const getOwner = async (req, res) => {
    const userProduct = await User_Products.findOne({ product_id: { $elemMatch: { $eq: req.params.product_id } } });
    res.status(200).send(userProduct.user_id);
}


    exports.addUserProduct = addUserProduct;
exports.getOwner = getOwner;