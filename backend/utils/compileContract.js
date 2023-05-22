const fs = require('fs');
const solc = require('solc');

let source = fs.readFileSync('contracts/CreateShop.sol', 'utf-8');

var compilerInput = {
    language: 'Solidity',
    sources: {
        'CreateShop.sol': {
            content: source
        }
    },
    settings: {
        optimizer:
        {
            enabled: true
        },
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

console.log('compiling contract');
let compiledContract = JSON.parse(solc.compile(JSON.stringify(compilerInput)));
console.log('Contract Compiled');

const contractName = Object.keys(compiledContract.contracts['CreateShop.sol'])[0];
const contractData = compiledContract.contracts['CreateShop.sol'][contractName];


contractABI = contractData.abi;
contractBytecode =  contractData.evm.bytecode.object;

module.exports = {
    contractABI,
    contractBytecode
};