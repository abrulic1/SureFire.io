import './NavLinks.css';
import ProfileImage from './profile.png';
import Cart from './cart.png';
import Wallet from './wallet.png';

const NavLinks = () =>{
    return (
     <div className='images-actions'>
      <button><img src={ProfileImage} alt="Profile"></img></button>
      <button><img src={Cart} alt="Cart"></img></button>
      <button><img src={Wallet} alt="Wallet"></img></button>
     </div>
    )
};

export default NavLinks;