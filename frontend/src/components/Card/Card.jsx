import React from "react";
import CardStyles from './Card.module.css';
import { useEffect } from "react";

const Card = (props) => {
  const cardStyle = {
    backgroundImage: `url(${props.image})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: '100%'
  };
    return (
    <div className={CardStyles.card} onClick={props.onClick}>
      <div className={CardStyles.image} style={cardStyle}>
      </div>
        <div className={CardStyles.description}>
          <h2>PRICE: { props.price }</h2>
      </div>
    </div>
    )
}

export default Card;