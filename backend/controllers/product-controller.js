const Product = require('../models/product');
const userUtils = require('../utils/user-utils');

const getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product)
            return res.status(404).json({ error: 'Product not found' });

        res.json(product);
    } catch (err) {
        res.status(500).send('Not valid params. Check console for more information');
    }
};

const addProduct = async (req, res) => {
    try {
        const { image, name, price, stock, description, owner } = req.body;
        const newProduct = new Product({
            name,
            normalizedName: name.toUpperCase(),
            image,
            description,
            price,
            stock,
            owner,
        });
        await newProduct.save();
        return res.status(200).json({ success: true, message: 'Product added successfully', product: newProduct });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Failed to add the product.' });
    }
}


const purchaseProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.product_id);
        if (!product)
            return res.status(404).json({ success: false, message: 'Product not found in database' });

        await Product.deleteOne({ _id: req.params.product_id });
        return res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Failed to purchase the product. Check console for more information' });
    }
}

const getProductsByOwnerAddress = async (req, res) => {
    try {
        const user = await userUtils.getByAddress(req.params.owner_address);
        const products = await Product.find({ user_id: user._id });
        if (!products)
            return res.status(404).json({ error: 'This user doesnt have any products!' });

        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Not valid params. Check console for more information');
    }
}

exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.addProduct = addProduct;
exports.purchaseProduct = purchaseProduct;
exports.getProductsByOwnerAddress = getProductsByOwnerAddress;