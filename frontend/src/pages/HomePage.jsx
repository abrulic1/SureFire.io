import React, { useState, useRef } from "react";
import { PropagateLoader } from "react-spinners";
import Header from "../components/Header/Header";
import Card from "../components/Card/Card";
import HomePageStyles from "./HomePage.module.css";
import {  useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getProducts } from "../services/user_products-service";
import EthereumIcon from "../components/Header/ethereum.png";
import { BE_URL } from "../utils/constants";
import FacebookIcon from './facebook.png';
import LinkedinIcon from './linkedin.png';
const HomePage = () => {
  const navigate = useNavigate();
  const [buttonState, setButtonState] = useState(false);
  const exploreProductsRef = useRef(null);
  const {
    isError,
    isLoading,
    data: products,
  } = useQuery(["products-2"], () =>
    getProducts(localStorage.getItem("account"))
  );

  const {
    data: allProducts,
    isLoading: allProductsLoading,
  } = useQuery(["allProducts"], () =>
    fetch(`${BE_URL}/user_products/`).then((res) => res.json())
  );

  const handleExploreProducts = () => {
    setButtonState(true);
    setTimeout(() => {
      exploreProductsRef.current.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  if (isLoading || allProductsLoading) {
    return (
      <div className={HomePageStyles.loading}>
        <PropagateLoader color="#F7F7F7" />
      </div>
    );
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <>
      <Header sendDataToParent={() => { }} />
      <div className={HomePageStyles.slideshow}>
        <img
          src="https://media.wired.com/photos/622bde93d53a49d05c484009/16:9/w_2400,h_1350,c_limit/NFTs-Don't-Work-They-Way-You-Think-Gear-1239020052.jpg"
          alt="Slideshow"
        />
        <div className={HomePageStyles.textOverlay}>
          <h2>Universal MarketSquare</h2>
          <h3>Empowering the Web3 Community</h3>
        </div>
        {/* <button className={HomePageStyles.buttonOverlay} onClick={handleExploreProducts}>
          Explore Products
        </button> */}
      </div>
      {localStorage.getItem('account') == null ? (
        allProducts && (
          <div ref={exploreProductsRef}>
            <h2>Explore Products</h2>
            <div className={HomePageStyles.products}>
              {allProducts.map((product) => (
                <Card
                  key={product._id}
                  image={`data:image/png;base64,${product.image}`}
                  price={product.price}
                  onClick={() => navigate(`/product?id=${product._id}`)}
                />
              ))}
            </div>
          </div>
        )
      ) : (
        products && (
          <div ref={exploreProductsRef}>
            <h2>Explore Products</h2>
            <div className={HomePageStyles.products}>
              {products.map((product) => (
                <Card
                  key={product._id}
                  image={`data:image/png;base64,${product.image}`}
                  price={product.price}
                  onClick={() => navigate(`/product?id=${product._id}`)}
                />
              ))}
            </div>
          </div>
        )
      )}
      <div className={HomePageStyles.footer}>
        <img src={EthereumIcon} alt="Ethereum" />
        <h1>SureFire.io</h1>
        <div className={HomePageStyles['social-media-icons']}>
          <a href="https://www.facebook.com/people/Almina-Bruli%C4%87/pfbid05x54aLpjFyFKCC2Wy9NBNhQFM6gzEaP7CvM5cr4Ec77fbZagMK5KHDr2Bro19HnSl/" target="_blank">
            <img src={FacebookIcon} alt="Facebook" />
          </a>
          <a href="https://www.linkedin.com/in/almina-bruli%C4%87-39105a1b3" target="_blank">
            <img src={LinkedinIcon} alt="Linkedin" />
          </a>
        </div>
        <h3>&copy; 2023 SureFire.io. All rights reserved.</h3>

      </div>
    </>
  );
};

export default HomePage;
