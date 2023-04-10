import MyCartStyles from './MyCart.module.css';
import ProfileImage from '../NavLinks/profile.png';
import Cart from '../NavLinks/cart.png';
import Wallet from '../NavLinks/wallet.png';
import Close from '../Header/close.png';
const MyCart = ({setIsCartShown})=>{
    const closeCart = () =>{
        setIsCartShown(false);
    }

   return (
   <div className={MyCartStyles['side-drawer']}>
      <div className={MyCartStyles['close-btn']}>
        <h2>Your cart</h2>
      <button><img src={Close} onClick={closeCart}></img></button>
      </div>
      <div className={MyCartStyles['cart-content']}>
        <h2>Your cart is empty</h2>
    </div>
    <div className={MyCartStyles.buttons}>
        <button disabled>Complete purchase</button>
    </div>
  </div>
   )
};

export default MyCart;