import './NavLinks.css';
import ProfileImage from './profile.png';
import Cart from './cart.png';
import Wallet from './wallet.png';
import Web3 from 'web3';

const NavLinks = () =>{
    let web3;
    const connectWalletHandler = () => {
        if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
            window.ethereum.request({method: "eth_requestAccounts"});
            web3 = new Web3(window.ethereum);
        } else {
            //metamask not installed
            alert('Please install MetaMask');
        }
    }

    return (
     <div className='images-actions'>
      <button><img src={ProfileImage} alt="Profile" onClick={connectWalletHandler}></img></button>
      <button><img src={Cart} alt="Cart"></img></button>
      <button><img src={Wallet} alt="Wallet"></img></button>
     </div>
    )
};

export default NavLinks;