import React from "react";
import { useQuery } from 'react-query';
import ProfileStyles from "./Profile.module.css";
import ProfileIcon from '../NavLinks/user.png';
import { accountAddress } from "./getAccountAddress";
import { accountBalance } from "./getAccountBalance";

const Profile =  () => {
      const { status, data: address, error } = useQuery('adresa', accountAddress);
      if (status==="loading") console.log("Loading...")
      if (error) console.log('Error fetching data...');
  
      const { isLoading, data: balance, isError} = useQuery('balans', accountBalance);
      if (isLoading==="loading") console.log("Loading...")
      if (isError) console.log('Error fetching data...');
    return (
       <div className={ProfileStyles['profile-card']}>
            <div className={ProfileStyles.image}>
                <img src ={ProfileIcon}></img>
            </div>
            <div className={ProfileStyles.info}>
                <h2>Unnamed</h2>
                <h2>Accout address: <span>{address}</span></h2>
                <h2>Balance: <span>{balance} ETH</span></h2>
            </div>
       </div>
    )
}

export default Profile;