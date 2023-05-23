const Web3 = require('web3');
const Contract = require('../models/contract');
const HDWalletProvider = require('@truffle/hdwallet-provider');

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // Browser with MetaMask
  web3 = new Web3(window.ethereum);
  window.ethereum.enable();
} else {
  // Non-browser environment, use truffle-hdwallet-provider
  const provider = new HDWalletProvider(process.env.PRIVATE_KEY_1, process.env.INFURA_SEPOLIA_API_URL);
  web3 = new Web3(provider);
}

const userUtils = require('../utils/user-utils');
const contractUtils = require('../utils/contract-utils');

const createShop = async (req, res) => {
  try {
    const contract = await contractUtils.getByOwner(process.env.OWNER_PUBLIC_KEY);
    const shop = new web3.eth.Contract(contract.abi, contract.address);

    const admin = await userUtils.getById(req.body.id);
    const accounts = await web3.eth.getAccounts();

    console.log("aacccccc ", accounts);
    await shop.methods.addAdmin(admin.address).send({ from: accounts[0] });

    //ovdje bi bilo dobro napravit da se vrate etheri owneru jer ovako on placa svako kreiranje novog admina......
    try {
      if (contract.admins.includes(admin.address)) {
        throw new Error('This user is already an admin.');
      }
    
      contract.admins.push(admin.address);
      await contract.save();
    } catch (error) {
      console.log('Cannot save to the database.');
      console.log(error);
      return res.status(400).json({ success: false, message: 'This user is already an admin.' });
    }

    res.status(200).json({ success: true, message: 'Shop created successfully.' });
  } catch (error) {
    console.error('Error creating shop:', error);
    res.status(500).json({ success: false, message: 'Failed to create shop.' });
  }
};

exports.createShop = createShop;
