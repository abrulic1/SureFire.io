import React from "react";
import Icon from './nft-test.png';
import CardStyles from './Card.module.css';
import { useEffect } from "react";

const Card = (props) => {
    return (
    <div className={CardStyles.card} onClick={props.onClick}>
      <h1>Monkey</h1>
      <div className={CardStyles.image}>
      <img></img>
      </div>
      <div className={CardStyles.description}>
      <h2>0.02 ETH</h2>
      </div>
    </div>
    )
}

export default Card;