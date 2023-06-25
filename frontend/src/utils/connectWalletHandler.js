import Web3 from "web3";
import { addUser } from "../services/user-service";
const connectWalletHandler = async (setIsConnected, setBalance) => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      let arrayOfAccounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const account = arrayOfAccounts[0];
      alert(`You are connected with one MetaMask account`);
      const web3 = new Web3(window.ethereum);
      const balance = await web3.eth.getBalance(account);
      const roundedBalance = parseFloat(web3.utils.fromWei(balance)).toFixed(2);
      setBalance(roundedBalance);
      setIsConnected(true);
      await addUser(account);
      return account;
    } catch (error) {
      alert(error.message);
    }
  } else {
    alert("Please install MetaMask");
  }
};

export default connectWalletHandler;
