import React from "react";
import FunctionalitiesStyles from './ProfileFunctionalities.module.css';
import ProfileImage from '../NavLinks/user.png';
import Grid from './grid.png';
import Cart from './cart.png';
import LogOut from './log-out.png';
import Order from './order.png';
import {useNavigate} from 'react-router-dom';

const Functionalities = ({userFunctionalities, setUserFunctionalities}) => {
    const closeFunctionalities = ()=>{
        setUserFunctionalities(false);
    } 
    const navigate = useNavigate();

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
         <h2>My Cart</h2>
      </span> */}
      {/* <span onClick={()=>navigate('/myorders')}>
      <img src={Order} alt="Orders"></img>
         <h2>Orders</h2>
      </span> */}
      <span>
      <img src={LogOut} alt="Log out"></img>
         <h2>Log out</h2>
      </span>
        </div>
       )
}

export default Functionalities;