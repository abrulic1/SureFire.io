import React from "react";
import Icon from './nft-test.png';
import CardStyles from './Card.module.css';
const Card = (props) => {
    return (
    <div className={CardStyles.card}>
      <h1>NFT's</h1>
      <div className={CardStyles.image}>
      <img></img>
      </div>
      <div className={CardStyles.description}>
      <h2>15 items</h2>
      </div>
    </div>
    )
}

export default Card;