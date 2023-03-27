import Web3 from "web3";

const connectWalletHandler = async () => {
  let web3;
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);

      web3.eth.getAccounts(function (error, accounts) {
        if (error) {
          alert(error);
        } else {
          // Check if MetaMask is connected
          if (accounts.length == 0) {
            alert("MetaMask is not connected");
          } else {
            // Get the connected account
            var currentAccount = accounts[0];
            console.log("Connected account:", currentAccount);
          }
        }
      });
    } catch (error) {
      alert(error.message);
    }
  } 
  else {
    //MetaMask not installed
    alert("Please install MetaMask");
  }
};

export default connectWalletHandler;
