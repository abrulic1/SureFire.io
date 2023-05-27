import MyCartStyles from './MyCart.module.css';
import Close from '../Header/close.png';
import { getUserOrders } from '../../services/order-service';
import { useQuery } from "react-query";
import { useEffect } from 'react';

const MyCart = ({setIsCartShown})=>{
    const closeCart = () =>{
        setIsCartShown(false);
  }
  const { data: userOrders, isLoading, isError } = useQuery('userOrders', () =>
  getUserOrders(localStorage.getItem('account'), { staleTime: 6000 })
);

  return (
   <div className={MyCartStyles['side-drawer']}>
      <div className={MyCartStyles['close-btn']}>
        <h2>Your cart</h2>
      <button><img src={Close} onClick={closeCart}></img></button>
      </div>
       <div className={MyCartStyles['cart-content']}>
        {userOrders && userOrders.products && userOrders.products.length > 0 ?
          (
            userOrders.products.map((product, index) => (
              <h2 key={index}>{product}</h2>
            ))
          )
          :
          (<h2>Your cart is empty!</h2>)
        }
    </div>
    <div className={MyCartStyles.buttons}>
        <button disabled>Complete purchase</button>
    </div>
  </div>
   )
};

export default MyCart;