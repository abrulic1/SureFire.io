import Web3 from "web3";

export const accountBalance = async () => {
  let account = '0x9f5d0535cc0d2b02672978c560d0e28c6c5ba663';
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      let balance = await window.ethereum.request({method: 'eth_getBalance', params:[account, 'latest']});
      let wei = parseInt(balance, 16);
      balance = wei / (10**18);
      console.log("balace is: " + balance + ' ETH');
      return balance;
    } catch (error) {
      alert(error.message);
    }
  }
};
