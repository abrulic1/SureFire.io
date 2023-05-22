const { contractABI, contractBytecode } = require('../utils/compileContract');
const Web3 = require('web3');
// const EthereumTx = require('ethereumjs-tx').Transaction;
const Contract = require('../models/contract');
const web3 = new Web3('http://127.0.0.1:7545');
const userController = require('./user-controller');

const createShop = async (req, res) => {
  try {
    const user = await userController.getById(req.body.owner);

    let contract = new web3.eth.Contract(contractABI);
    let payload = {
      data: contractBytecode
    }

    let parameter = {
      from: user.address,
      gas: 6721975
    }

    let contractAddress;
    await contract.deploy(payload).send(parameter,  (err, transactionHash) => {
      console.log('Transaction Hash :', transactionHash);
    }).on('confirmation', () => { }).then( (newContractInstance) => {
      contractAddress =newContractInstance.options.address;
      console.log('Deployed Contract Address : ', contractAddress);
    })

    console.log('Deployed Contract Address : ', contractAddress);
    const newContract = new Contract({
      owner: req.body.owner,
      address: contractAddress,
      abi: contractABI,
    });

    await newContract.save();

    res.status(200).json({ success: true, message: 'Shop created successfully.' });
  } catch (error) {
    console.error('Error creating shop:', error);
    res.status(500).json({ success: false, message: 'Failed to create shop.' });
  }
};

exports.createShop = createShop;
