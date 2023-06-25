import Web3 from 'web3';
import { BE_URL } from "../utils/constants";
import { getUserByAddress, getUserById } from "./user-service";
import { purchaseProductFromDB } from './product-service';
import { saveTransactionDetails } from './transaction-service';
import { getOwner } from './user_products-service';

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

export const addProduct = async (userAddress, formData, name, price, stock) => {
    let web3 = new Web3(window.ethereum);
    let contract = await getContractByUser(userAddress);
    const shop = new web3.eth.Contract(contract.abi, contract.address);
  try {
    await shop.methods.addProduct(name, price, stock).send({ from: userAddress });
    
    //NOTE 2: Second we add product to database if transaction is not reverted, otherwise we will add some popup notification to inform user that product cannot be stored because of duplication
    const response = await fetch(`${BE_URL}/products/add-product`, {
      method: 'POST',
      body: formData  // Send the formData object directly
    });

    if (!response.ok) {
      throw new Error('Failed to add the product.');
    }

    const data = await response.json();
    return data;

    } catch (error) {
      console.error(error);
    }
  
}
  

export const purchaseProduct = async (productId, productName, userAddress, price, name, surname, address, email) => {
  try {
    let web3 = new Web3(window.ethereum);
    //uzeti contract na osnovu ownera ali iz User_Products tabele
    let ownerId = await getOwner(productId);
    let owner = await getUserById(ownerId);
    console.log("owner: ", owner);
    let contract = await getContractByUser(owner.address);
    const shop = new web3.eth.Contract(contract.abi, contract.address);
    console.log("price ", price);
    const transaction = await shop.methods.purchase(productName, 1).send({
      from: userAddress,
      value: price
    });

    const transactionHash = transaction.transactionHash;
    const fromAddress = transaction.from;
    const toAddress = transaction.to;

    await purchaseProductFromDB(productId, userAddress);

    const transactionUrl = `https://sepolia.etherscan.io/tx/${transactionHash}`;
    const user_info = {
      name,
      surname,
      address,
      email
    }
    saveTransactionDetails(transactionHash, transactionUrl, fromAddress, toAddress, userAddress, user_info);
  } catch (error) {
    console.error(error);
  }
};


