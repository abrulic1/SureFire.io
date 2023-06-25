const Product = require('../models/product');
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


const getUserProducts = async (req, res) => {
    try {
        const products = await User_Products.find({ user_id: req.query.user_id });
        res.status(200).send(products);
    } catch (err) {
        res.status(400).send(null);
    }
}
const getProductsWhereOwnerIsNot = async (req, res) => {
    try {
        const products = await User_Products.find();
        const productsOfOwners = products.filter(p => p.user_id != req.query.user_id);
        const onlyProducts = productsOfOwners.map(p => p.product_id).flat();
        const productsagain = [];
        for (const id of onlyProducts) {
            const p = await Product.findById(id);
            productsagain.push(p)
        }
        
        const updatedProducts = productsagain.map((product) => {
            return {
              ...product._doc,
              image: Buffer.from(product.image).toString('base64')
            };
          });
          res.status(200).json(updatedProducts);
    } catch (error) {
        console.log(error);
    }
}

exports.addUserProduct = addUserProduct;
exports.getOwner = getOwner;
exports.getUserProducts = getUserProducts;
exports.getProductsWhereOwnerIsNot = getProductsWhereOwnerIsNot;