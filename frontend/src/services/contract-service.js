import Web3 from 'web3';
import { BE_URL } from "../utils/constants";

export const deploySmartContract = async () => {
    let contractABI, contractBytecode;
    try {
        const response = await fetch(
          `${BE_URL}/contracts/contract-artifacts`
        );
        const data = await response.json();
        console.log("dddddd: ", data);
        contractABI = data.contractABI;
        contractBytecode = data.contractBytecode;
      } catch (error) {
        console.log(error);
      }
    if (typeof window.ethereum === 'undefined') {
      const installConfirmation = window.confirm('MetaMask is not installed. Do you want to install it?');
      if (installConfirmation) {
        window.open('https://metamask.io/');
      }
      throw new Error('MetaMask is not installed');
    }
  
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length === 0) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        throw new Error('User denied account access');
      }
    }
  
    const web3 = new Web3(window.ethereum);
    const userAddress = accounts[0];
    console.log("CONTRACT ABI: ", contractABI);
    const contract = new web3.eth.Contract(contractABI);
  
    const deployedContract = await contract.deploy({
      data: contractBytecode
    }).send({
      from: userAddress,
      gas: 2000000,
    });
  
    return deployedContract.options.address;
  };
  