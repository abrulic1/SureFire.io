import MyCartStyles from './MyCart.module.css';
import Close from '../Header/close.png';
import { getUserOrders } from '../../services/order-service';
import { useQuery } from "react-query";
import { useEffect, useState } from 'react';
import { fetchProductById } from '../../services/product-service';
import Button from '../Button/Button';
import { buyNowClick } from '../../utils/buyNowClick';

const MyCart = ({ setIsCartShown }) => {
  const closeCart = () => {
    setIsCartShown(false);
  };

  const { data: userOrders, isLoading, isError } = useQuery('userOrders', () =>
    getUserOrders(localStorage.getItem('account'), { staleTime: 6000 })
  );

  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const products = userOrders?.products || [];
        const fetchedProducts = [];

        for (const product of products) {
          const productData = await fetchProductById(product);
          fetchedProducts.push(productData);
        }

        setProductsData(fetchedProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductsData();
  }, [userOrders]);

  return (
    <div className={MyCartStyles['cart']}>
      <div className={MyCartStyles['close-btn']}>
        <h2>Your cart</h2>
        <button><img src={Close} onClick={closeCart} alt="Close"></img></button>
      </div>
      <div className={MyCartStyles['cart-content']}>
        {userOrders && userOrders.products && userOrders.products.length > 0 ? (
          productsData.map((product, index) => (
            <div key={index} className={MyCartStyles.item}>
              {/* Render the product details */}
              {/* Example: */}
              <span className={MyCartStyles.spanko}>
              <img src={product.image}></img>
                <h2>{product.name}</h2>
                </span>
              <Button mode='dark' text="Buy" onClick={ () => buyNowClick(product._id, localStorage.getItem('account')) } />
            </div>
          ))
        ) : (
          <h2>Your cart is empty!</h2>
        )}
      </div>
    </div>
  );
};

export default MyCart;
