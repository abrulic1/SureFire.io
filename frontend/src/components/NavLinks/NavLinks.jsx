import React, { useState, useEffect } from "react";
import NavLinksStyles from "./NavLinks.module.css";
import Cart from "./cart2.png";
import connectWalletHandler from '../../utils/connectWalletHandler';
import ProfileIcon from './acc.png';
const NavLinks = ({ setUserFunctionalities, setIsCartShown }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState(localStorage.getItem("balance") || 0);
  const [account, setAccount] = useState(localStorage.getItem("account") || null);

  useEffect(() => {
    if (account) {
      setIsConnected(true);
    }
  }, [account]);

  useEffect(() => {
    localStorage.setItem("balance", balance);
  }, [balance]);
  
  
  const showCart = () => {
    setIsCartShown(true);
  };

  const handleConnectWallet = async () => {
    const connectedAccount = await connectWalletHandler(setIsConnected, setBalance);
    if (connectedAccount == null) return;
    setAccount(connectedAccount);
    localStorage.setItem("account", connectedAccount);
  };
  
  const showFunctionalities = () => {
    setUserFunctionalities(true);
  };

  return (
    <div className={NavLinksStyles["images-actions"]}>
      {!localStorage.getItem("account") ? (
        <button 
          title="Connect with MetaMask"
          className={NavLinksStyles.connect}
          onClick={handleConnectWallet}
        >
          Connect with MetaMask
        </button>
      ) : (
          <>
        <button title="Balance" className={NavLinksStyles.balance} onClick={showFunctionalities}>
          {balance} ETH
          </button>
            {/* <button className={NavLinksStyles.profile} title="Profile">
              <img src={ProfileIcon} onClick={showFunctionalities} />
            </button> */}
                <button title="My Cart">
        <img src={Cart} alt="Cart" onClick={showCart} />
      </button>
            </>
      )}
    </div>
  );
};

export default NavLinks;
