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

const addProduct = async (req, res) => {
    console.log("addProduct route");
    try {
        const { image, name, price, owner } = req.body;

        const newProduct = new Product({
            image,
            name,
            normalizedName: name.toUpperCase(),
            price,
            owner
        });

        await newProduct.save();

        return res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
        console.log('Cannot save the product to the database.');
        console.log(error);
        return res.status(500).json({ success: false, message: 'Failed to add the product.' });
    }
}

exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.addProduct = addProduct;