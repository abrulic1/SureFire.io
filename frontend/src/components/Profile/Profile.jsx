import React from "react";
import { useQuery } from 'react-query';
import ProfileStyles from "./Profile.module.css";
import ProfileIcon from '../NavLinks/user.png';
import { accountAddress } from "./getAccountAddress";
import { accountBalance } from "./getAccountBalance";
import Header from '../Header/Header';
import { useNavigate } from "react-router-dom";
const Profile =  () => {
    const navigate = useNavigate();
      const { status, data: address, error } = useQuery('adresa', accountAddress);
      if (status==="loading") console.log("Loading...")
      if (error) console.log('Error fetching data...');
  
      const { isLoading, data: balance, isError} = useQuery('balans', accountBalance);
      if (isLoading==="loading") console.log("Loading...")
      if (isError) console.log('Error fetching data...');
    return (
        <>
        <Header />
       <div className={ProfileStyles['profile-card']}>
            <div className={ProfileStyles.image}>
                <img src ={ProfileIcon}></img>
            </div>
            <div className={ProfileStyles.info}>
                <h2>Unnamed</h2>
                <h2>Accout address: <span>{address}</span></h2>
                <h2>Balance: <span>{balance} ETH</span></h2>
            </div>
            <div className={ProfileStyles.buttons}>
                <button onClick={() => navigate('/myshop')}>Check your shop</button>
                <button onClick={() => navigate('/myorders')}>Check your orders</button>
                <button onClick={() => navigate('/wishlist')}>Check your wishlist</button>
                <button>Check your cart</button>
            </div>
       </div>
       </>
    )
}

export default Profile;