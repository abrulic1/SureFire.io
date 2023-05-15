const Web3 = require('web3');
const web3 = new Web3(window.ethereum);

let contract;

const fetchFun = async () => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/shops/`);
  contract = await response.json();
  console.log("RESPONSE DATA za contract IS: ", contract);
}

const purchaseProduct = async (productId, price, userAddress) => {
  await fetchFun();
    try {
      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];
      const result = await contract.methods.purchase(productId).send({
        from: userAddress,
        value: price,
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
}
  
module.exports = purchaseProduct;