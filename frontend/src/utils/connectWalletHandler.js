import Web3 from "web3";

const connectWalletHandler = async (setIsConnected, setBalance) => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      let arrayOfAccounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const account = arrayOfAccounts[0];
      alert(`You are connected with ${account} account`);

      const web3 = new Web3(window.ethereum);
      const balance = await web3.eth.getBalance(account);
      const formattedBalance = web3.utils.fromWei(balance);
      const roundedBalance = parseFloat(formattedBalance).toFixed(2);
      setBalance(roundedBalance);
      setIsConnected(true);
      return account;
    } catch (error) {
      alert(error.message);
    }
  } else {
    // MetaMask not installed
    alert("Please install MetaMask");
  }
};

export default connectWalletHandler;
