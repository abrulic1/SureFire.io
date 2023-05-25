const Web3 = require('web3');
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


exports.web3 = web3;
