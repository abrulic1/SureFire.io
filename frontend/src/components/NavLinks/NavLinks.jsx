import { useState } from 'react';
import NavLinksStyles from './NavLinks.module.css';
import MetaMaskIcon from './profile.png';
import UserIcon from './user.png';
import Cart from './cart.png';
import Wallet from './wallet.png';
import connectWalletHandler from '../../connectWalletHandler';

const NavLinks = ({userFunctionalities, setUserFunctionalities}) =>{
    const [isMetaMaskLogoShown, setIsMetaMaskLogoShown] = useState(false);
    const [profileImage, setProfileImage] = useState(MetaMaskIcon);

    let accoutAddress ;
    const handleClick = async () => {
        accoutAddress = await connectWalletHandler(isMetaMaskLogoShown, setIsMetaMaskLogoShown);
        if(isMetaMaskLogoShown) setProfileImage(UserIcon);
    }
    const showFunctionalities = ()=>{
        setUserFunctionalities(true);
    }

    return (
     <div className={NavLinksStyles['images-actions']}>
        {/* {
            isMetaMaskLogoShown 
              ? <button title='Connect with MetaMask'><img src={MetaMaskIcon} alt="Profile" onClick={handleClick}></img></button>
              :   <button ><img src={UserIcon} alt="Profile" onClick={showFunctionalities}></img></button>
        } */}
        <button title='Connect with MetaMask'><img src={MetaMaskIcon} alt="Profile" onClick={handleClick}></img></button>
        <button title='My Cart'><img src={Cart} alt="Cart"></img></button>
        <button title='My Wallet'><img src={Wallet} alt="Wallet"></img></button>
     </div>
    )
};

export default NavLinks;