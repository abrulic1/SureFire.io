import { makeOrder } from "../../services/order-service";

export const handleBuyNowClick = async (owner, id) => {
    console.log("handleBUynowClick");
    //if user is not connected with metamask, there we have to connect
    //if user is connected, than we have to check can user buy this product 
    try {
        if (window.ethereum && window.ethereum.selectedAddress) {
          // User is connected to Metamask and has authorized your app
          const userAddress = window.ethereum.selectedAddress;
          console.log(`User is connected with address ${userAddress}`);
  
          alert("Confirm adding this product to your cart");
          makeOrder(userAddress, id);
          
        } else {
          // User is not connected to Metamask or has not authorized your app
            console.log('User is not connected with Metamask');
            if (!window.ethereum) {
                alert('Metamask extension is not installed. Please install it before continuing.');
                const installLink = 'https://metamask.io/download.html';
                window.open(installLink, "_blank"); // o
              } else if (window.confirm('Please connect to Metamask to continue.')) {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
              }
        }
      } catch (error) {
        // Metamask is not available or not enabled in the user's browser
        console.error('Metamask is not available:', error.message);
        // Provide fallback behavior
      }
}