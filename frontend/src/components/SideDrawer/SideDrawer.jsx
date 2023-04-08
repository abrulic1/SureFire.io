import SideDrawerStyles from './SideDrawer.module.css';
import ProfileImage from '../NavLinks/profile.png';
import Cart from '../NavLinks/cart.png';
import Wallet from '../NavLinks/wallet.png';
import connectWalletHandler from '../../connectWalletHandler';

const SideDrawer = ()=>{
   return (
   <div className={SideDrawerStyles['side-drawer']}>
      <span onClick={connectWalletHandler}>
      <img src={ProfileImage} alt="Profile"></img>
         <h2>Connect with MetaMask</h2>
      </span>
      <span>
      <img src={Cart} alt="Cart"></img>
         <h2>Cart</h2>
      </span>
      <span>
      <img src={Wallet} alt="Wallet"></img>
         <h2>Wallet</h2>
      </span>
  </div>
   )
};

export default SideDrawer;