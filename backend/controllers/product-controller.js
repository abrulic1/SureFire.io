const Product = require('../models/product');

const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    // res.json({ products: products.map( user => user.toObject({getters: true})) }); 
    console.log("Get all products route");
    res.json(products);
}


const getProductById = async (req, res) => {
    console.log("getProductById")
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err.reason);
        res.status(500).send('Not valid params. Check console for more information');
    }
};



exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;