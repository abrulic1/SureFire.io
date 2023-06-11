import Web3 from 'web3';
import { BE_URL } from "../utils/constants";
import { getUserByAddress } from "./user-service";

export const deploySmartContract = async () => {
    let contractABI, contractBytecode;
    try {
        const response = await fetch(
          `${BE_URL}/contracts/contract-artifacts`
        );
        const data = await response.json();
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
    const contract = new web3.eth.Contract(contractABI);
  
    const deployedContract = await contract.deploy({
      data: contractBytecode
    }).send({
      from: userAddress,
      gas: 2000000,
    });
    const owner = await getUserByAddress(userAddress);
    await saveContract(deployedContract.options.address, contractABI, contractBytecode, owner._id);
};
  
 const saveContract = async (address, abi, bytecode, owner) => {
     try {
         const request = {
             address,
             abi,
             bytecode,
             owner
        }
        await fetch(`${BE_URL}/contracts/add-contract`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(request)
        })
      }
      catch (error) {
        console.error(error);
      }
}


export const getContractByUser = async (userAddress) => {
    try {
        const user = await getUserByAddress(userAddress);
        const response = await fetch(
          `${BE_URL}/contracts/get-contract?user_id=${user._id}`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
      }
}

export const addProduct = async (userAddress, name, price, stock, image, description) => {
    let web3 = new Web3(window.ethereum);
    let contract = await getContractByUser(userAddress);
    const shop = new web3.eth.Contract(contract.abi, contract.address);
    console.log("SHOP: ", shop);
  try {
      //NOTE 1: First we add product on Ethereum, transaction will be reverted if we try to add product that is already stored on Ethereum
    // await shop.methods.addProduct(name, price, stock).send({ from: userAddress });
    
    //NOTE 2: Second we add product to database if transaction is not reverted, otherwise we will add some popup notification to inform user that product cannot be stored because of duplication

    const request = {
      name, 
      image,
      description,
      price,
      stock,
      owner: userAddress
    }
    await fetch(`${BE_URL}/products/add-product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })

    console.log("reeeeeee: ", request);
    } catch (error) {
      console.error(error);
    }
  
}
  