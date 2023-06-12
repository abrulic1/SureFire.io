import MyCartStyles from './MyCart.module.css';
import Close from '../Header/close.png';
import { useQuery } from "react-query";
import { useEffect, useState } from 'react';
import { fetchProductById } from '../../services/product-service';
import Button from '../Button/Button';
import { purchaseProduct } from '../../services/product-service';
import { getUserItems } from '../../services/cart_item-service';

const MyCart = ({ setIsCartShown }) => {
  const closeCart = () => {
    setIsCartShown(false);
  };

  const { data: userOrders} = useQuery('userOrders', () =>
    getUserItems(localStorage.getItem('account')),{ staleTime: 6000 }
  );

  
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const products = userOrders;
        const fetchedProducts = [];

        for (const product of products) {
          const productData = await fetchProductById(product);
          fetchedProducts.push(productData);
        }

        console.log("fetchedproducts: ", fetchedProducts)
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
        {userOrders && userOrders.length > 0 ? (
          productsData.map((product, index) => (
            <div key={index} className={MyCartStyles.item}>
              <span className={MyCartStyles.spanko}>
                {console.log("product: ", product)}
              <img src={`data:image/*;base64,${product.image}`}></img>
                <h2>{product.name}</h2>
                </span>
              <Button mode='dark' text="Buy" onClick={ () => purchaseProduct(product._id, localStorage.getItem('account')) } />
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
