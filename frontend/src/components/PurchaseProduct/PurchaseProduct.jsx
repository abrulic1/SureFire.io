import React, { useState } from 'react';
import PurchaseProductStyles from './PurchaseProduct.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchProductById } from '../../services/product-service';
import { purchaseProduct } from '../../services/contract-service';
import LoadingCircle from '../LoadingCircle/LoadingCircle';

const PurchaseProduct = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("id");
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  const { data: product, isFetching } = useQuery('productId', () => fetchProductById(productId));

  const handlePurchase = async () => {
    try {
      await purchaseProduct(productId, product.name, localStorage.getItem("account"), product.price, name, surname, address, email);
      navigate('/'); 
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <>
      <h1>PURCHASE PRODUCT</h1>
      <div className={PurchaseProductStyles['purchase-container']}>
        {isFetching ? (
          <>
            {console.log("product", product)}
            <LoadingCircle />
            </>
        ) : product ? (
          <div className={PurchaseProductStyles.details}>
            <h1>Product details</h1>
            <h2>Product name: {product.name}</h2>
            <h2>Price: {product.price}</h2>
            <h2>Quantity: 1</h2>
            <h2>Description: {product.description}</h2>
            <img src={`data:image/*;base64,${product.image}`} alt="Product" />
          </div>
        ) : (
          console.log("PRODUCT: ", productId)
        )}
        <div className={PurchaseProductStyles.fillData}> 
        <h1>Fill your data</h1>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="surname">Surname:</label>
        <input
          type="text"
          id="surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h2>Estimated delivery: 30 - 60 days</h2>

        <button type="submit" onClick={handlePurchase}>
          Submit
        </button>
        </div>
        </div>
    </>
  );
};

export default PurchaseProduct;
