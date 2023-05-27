import React from "react";
import FunctionalitiesStyles from './ProfileFunctionalities.module.css';
import ProfileImage from '../NavLinks/user.png';
import Grid from './grid.png';
import Cart from './cart.png';
import LogOut from './log-out.png';
import {useNavigate} from 'react-router-dom';

const Functionalities = ({userFunctionalities, setUserFunctionalities}) => {
    const closeFunctionalities = ()=>{
        setUserFunctionalities(false);
    } 
    const navigate = useNavigate();

   //  const handleLogout = () => {
   //    try {
   //      // Clear the account and balance values
   //    //   setAccount(null);
   //    //   setBalance(0);
   //    //   setIsConnected(false);
   //      localStorage.removeItem("account");
   //      localStorage.removeItem("balance");
    
   //      // Prompt the user to manually disconnect from MetaMask
   //      alert("Please disconnect from MetaMask manually.");
   //    } catch (error) {
   //      console.error("Error occurred while logging out:", error);
   //    }
   //  };
  
       return ( 
       <div className={FunctionalitiesStyles.functionalities} onMouseLeave={closeFunctionalities}>
        
      
        <span onClick={()=>navigate('/profile')}>
      <img src={ProfileImage} alt="Profile"></img>
         <h2>Profile</h2>
      </span>
   
      <span onClick={()=>navigate('/myshop')}>
      <img src={Grid} alt="My Shop"></img>
         <h2>My shop</h2>
      </span>
      {/* <span onClick={()=>navigate('/mycart')}>
      <img src={Cart} alt="Cart"></img>
         <h2>My Orders</h2>
      </span> */}
      <span>
      <img src={LogOut} alt="Log out"></img>
         <h2>Log out</h2>
      </span>
        </div>
       )
}

export default Functionalities;