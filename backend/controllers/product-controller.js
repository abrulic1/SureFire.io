const Product = require('../models/product');
const userUtils = require('../utils/user-utils');
const { addUserProduct } = require('./user_products-controller');
const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      const updatedProducts = products.map((product) => {
        return {
          ...product._doc,
          image: Buffer.from(product.image).toString('base64')
        };
      });
      res.json(updatedProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to retrieve products.' });
    }
  };

const getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
        if (!product)
            return res.status(404).json({ error: 'Product not found' });

      const updatedProduct = {
        ...product._doc,
        image: Buffer.from(product.image).toString('base64')
      };
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).send('Not valid params. Check console for more information');
    }
};

const addProduct = async (req, res) => {
    console.log("uslo je u addddprododododod");
    try {
        const { owner, name, description, price, stock } = req.body;
 
        if (!req.files || !req.files.image) {
          return res.status(400).json({
            success: false,
            message: 'Image file is required.'
          });
        }
    
        const image = req.files.image.data;
        const user = await userUtils.getByAddress(owner);
        const newProduct = new Product({
            name,
            normalizedName: name.toUpperCase(),
            image,
            description,
            price,
            stock
        });
        const savedProduct = await newProduct.save();
        await addUserProduct(user[0]._id, savedProduct._id);

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
      
      if (product.stock == 1) {
        //obrisat ga iz svih ostalih korpi i tek onda odavje 
      }

        await Product.deleteOne({ _id: req.params.product_id });
        return res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Failed to purchase the product. Check console for more information' });
    }
}

exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.addProduct = addProduct;
exports.purchaseProduct = purchaseProduct;