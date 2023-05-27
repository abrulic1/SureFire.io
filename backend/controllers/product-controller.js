const Product = require('../models/product');
const { web3 } = require('../utils/interact-with-Ethereum');
const contractUtils = require('../utils/contract-utils');
const userUtils = require('../utils/user-utils');
const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');

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
        console.error(err);
        res.status(500).send('Not valid params. Check console for more information');
    }
};

const addProduct = async (req, res) => {
    //ovo sve morm testirat kroz browser zbog metamaska...........
    console.log("addProduct route");
    try {
        const { image, name, price, stock, description, owner } = req.body;

        const newProduct = new Product({
            image,
            name,
            normalizedName: name.toUpperCase(),
            owner,
            description
        });

        await newProduct.save();

         //ovo sve sto radi sa blockchainom trebam izdvojit na drugo mjesto, lose ovdje
        try {
            const contract = await contractUtils.getByOwner(process.env.OWNER_PUBLIC_KEY);
            const shop = new web3.eth.Contract(contract.abi, contract.address);

        //iz params dobijam id proizvoda, iz querya trenutnog usera ... 
        const seller = await userUtils.getById(owner);
    await shop.methods.addProduct(name.toUpperCase(), price, stock).send({ from: seller.address });
        }
        catch (error) {
            console.log("CANNOT STORE PROODUCT ON ETHEREUM BLOCKCHAIN");
            console.log(error);
            return res.status(500).json({ success: false, message: 'Failed to store this product on Ethereum Blockchain!.' });
        }
        return res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
        console.log('Cannot save the product to the database.');
        console.log(error);
        return res.status(500).json({ success: false, message: 'Failed to add the product.' });
    }
}


const purchaseProduct = async (req, res) => {
    //provjera da li je proizvod na stanju .....
    try {
    const contract = await contractUtils.getByOwner(process.env.OWNER_PUBLIC_KEY);
    const shop = new web3.eth.Contract(contract.abi, contract.address);

        //iz params dobijam id proizvoda, iz querya trenutnog usera ... 
        const buyer = await userUtils.getById(req.query.id);
        const product = await Product.findById(req.params.id);

    await shop.methods.purchase(product.name).send({ from: buyer.address });
    } catch (error) {
        
    }
}

const getProductsByOwnerAddress = async (req, res) => {
    try {
        const user = await userUtils.getByAddress(req.params.owner_address);
        const products = await Product.find({ owner: user._id});
        if (!products) {
            return res.status(404).json({ error: 'This user doesnt have any products!' });
        }
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