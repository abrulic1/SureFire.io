import { addCartItem } from "../../services/cart_item-service";
import { getUserByAddress } from "../../services/user-service";


export const handleBuyNowClick = async (userAddress, product_id) => {
  console.log("handleBUynowClick");
  console.log("user i id: ", userAddress, " ",product_id);
    try {
        if (window.ethereum && window.ethereum.selectedAddress) {
          const userAddress = window.ethereum.selectedAddress;
          console.log(`User is connected with address ${userAddress}`);
  
          alert("Confirm adding this product to your cart");
          const user = await getUserByAddress(userAddress);
          addCartItem(user._id, product_id);
          
        } else {
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
        console.error('Metamask is not available:', error.message);
      }
}