import Web3 from 'web3';

export const accountAddress = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
          let arrayOfAccounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          return arrayOfAccounts[0];
        } catch (error) {
          alert(error.message);
        }
      } 
      else {
        //MetaMask not installed
        alert("Please install MetaMask");
      }
}