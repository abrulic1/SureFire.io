const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const userUtils = require('../utils/user-utils');
const contractUtils = require('../utils/contract-utils');

let web3 = new Web3(new HDWalletProvider(process.env.PRIVATE_KEY_1, process.env.INFURA_SEPOLIA_API_URL));
let seed = false;

const seedEthereum = async () => {
    if (seed == false) {
        try {
        const contract = await contractUtils.getByOwner(process.env.OWNER_PUBLIC_KEY);
        const shop = new web3.eth.Contract(contract.abi, contract.address);
            // await shop.methods.addProduct("GLASSES", 1, 5).send({ from: process.env.OWNER_PUBLIC_KEY });
            // await shop.methods.addProduct("UNO CARDS", 2, 5).send({ from: process.env.OWNER_PUBLIC_KEY });
        }
        catch (error) {
            console.log("Unable to seed");
            console.error(error);
        }
    }
    seed = true;
}

exports.seedEthereum = seedEthereum;