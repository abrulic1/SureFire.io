import { useState } from 'react';
import './NavLinks.css';
import ProfileImage from './profile.png';
import Cart from './cart.png';
import Wallet from './wallet.png';
import connectWalletHandler from '../../connectWalletHandler';

const NavLinks = () =>{
    const [isMetaMaskLogoShown, setIsMetaMaskLogoShown] = useState(false);
 
    const handleClick = () => {
        connectWalletHandler();
        setIsMetaMaskLogoShown( state => state = !state);
        console.log(isMetaMaskLogoShown);
    }

    return (
     <div className='images-actions'>
        <button><img src={ProfileImage} alt="Profile" onClick={handleClick}></img></button>
        <button><img src={Cart} alt="Cart"></img></button>
        <button><img src={Wallet} alt="Wallet"></img></button>
     </div>
    )
};

export default NavLinks;