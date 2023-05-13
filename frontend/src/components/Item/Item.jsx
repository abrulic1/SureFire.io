import React, { useState } from "react";
import { useParams, useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
import ItemStyles from './Item.module.css';
import { handleBuyNowClick } from './handleBuyNowClick';
const Item = () => {
    console.log("KOMONENTA SE RENDERUJE");
const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const id = searchParams.get('id');
 const [item, setItem] = useState(null);    
useEffect(() => {
    const fetchItem =  async () => {
        const response = await fetch(`http://localhost:5000/api/products/products/${encodeURIComponent(id)}`);
        const data = await response.json();
        console.log("RESPONSE DATA ISsssssssssss: ",data);
      setItem(data);
    }
    fetchItem();
}, []);
    
  return (
    <div>
          <h1>PRODUCT DETAILS</h1>
          {item && (
  <div className={ItemStyles.content}>
    <div className={ItemStyles.image}>
        <img src={item.image}></img>
    </div>
    <div className={ItemStyles.details}>
        <h2>{item.name}</h2>
        <h3>Owned by: {item.owner}</h3>
        <div className={ItemStyles.price}>
            <h3>Current Price</h3>
            <h2>{item.price} ETH</h2>
            <div className={ItemStyles.buttons}>
                <button onClick={() => handleBuyNowClick(item.owner)}>Buy now</button>
                <button>Cart</button>
                </div>
        </div>
        <h2>Description</h2>
        <h3>No description available</h3>
    </div>
  </div>
)}
     </div>
  );
}

export default Item;