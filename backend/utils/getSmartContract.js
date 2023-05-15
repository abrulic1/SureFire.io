const Web3 = require('web3');
const fs = require('fs'); // require the fs module to read the file

// read the contract ABI file and store it in a variable

const getSmartContract = () => {
    const contractABI = JSON.parse(fs.readFileSync('./build/contracts/CreateShop.json')).abi;
    // print the contract ABI to the console
    console.log("CONTRACT ABI:\n");
    console.log(contractABI);
    const contractAddress = '0xa399b55B84f06381322278AD384F1B05C1088287'; // Your contract's address
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    return contract;
}

module.exports = getSmartContract;