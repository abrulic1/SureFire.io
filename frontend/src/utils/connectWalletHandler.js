import Web3 from "web3";

const connectWalletHandler = async (isMetaMaskLogoShown, setIsMetaMaskLogoShown) => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    // setIsMetaMaskLogoShown (isMetaMaskLogoShown=false);
    try {
      let arrayOfAccounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      alert(`You are connected with ${arrayOfAccounts[0]} account`);
      setIsMetaMaskLogoShown (isMetaMaskLogoShown=true);
      return arrayOfAccounts[0];
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
