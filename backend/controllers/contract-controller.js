const Contract = require('../models/contract');
const userUtils = require('../utils/user-utils');
const contractUtils = require('../utils/contract-utils');
const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');

let web3 = new Web3(new HDWalletProvider(process.env.PRIVATE_KEY_1, process.env.INFURA_SEPOLIA_API_URL));

const createShop = async (req, res) => {
  try {
    const contract = await contractUtils.getByOwner(process.env.OWNER_PUBLIC_KEY);
    const shop = new web3.eth.Contract(contract.abi, contract.address);
    const admin = await userUtils.getById(req.body.id);

    try {
      await shop.methods.addAdmin(admin.address).send({ from: process.env.OWNER_PUBLIC_KEY });

      if (contract.admins.includes(admin.address))
        throw new Error('This user is already an admin.');

      contract.admins.push(admin.address);
      await contract.save();
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, message: 'ETHEREUM ERR: This user is already an admin.' });
    }

    res.status(200).json({ success: true, message: 'Shop created successfully.' });
  } catch (error) {
    console.error('Error creating shop:', error);
    res.status(500).json({ success: false, message: 'Failed to create shop.' });
  }
};


const addAdmin = async (req, res) => {
  try {
    const contract = await contractUtils.getByOwner(process.env.OWNER_PUBLIC_KEY);
    const shop = new web3.eth.Contract(contract.abi, contract.address);
    const admin = await userUtils.getById(req.body.id);

    //BITNO: Ovo bi bilo dobro napravit na frontu da user potvrdi transakciju i tako on plati, ovako owner contracta placa dodavanje admina
    await shop.methods.addAdmin(admin.address).send({ from: process.env.OWNER_PUBLIC_KEY });

    try {
      if (contract.admins.includes(admin.address))
        throw new Error('This user is already an admin.');

      contract.admins.push(admin.address);
      await contract.save();
    } catch (error) {
      console.log('Cannot save to the database.');
      console.log(error);
      return res.status(400).json({ success: false, message: 'This user is already an admin.' });
    }

    res.status(200).json({ success: true, message: 'Admin added successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to add admin.' });
  }
}



exports.createShop = createShop;
exports.addAdmin = addAdmin;
