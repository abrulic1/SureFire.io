import React, { useState, useRef } from "react";
import Header from "../components/Header/Header";
import Card from "../components/Card/Card";
import HomePageStyles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getProducts } from "../services/user_products-service";

const HomePage = () => {
  const navigate = useNavigate();
  const [buttonState, setButtonState] = useState(false);
  const exploreProductsRef = useRef(null);
  const {
    isError,
    isLoading,
    data: products
  } = useQuery(["products-2"], () => getProducts(localStorage.getItem("account")),  {staleTime: 1000});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  const handleExploreProducts = () => {
    setButtonState(true);
    setTimeout(() => {
      exploreProductsRef.current.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  return (
    <>
      <Header sendDataToParent={() => {}} />
      <div className={HomePageStyles.slideshow}>
        <img src="https://media.wired.com/photos/622bde93d53a49d05c484009/16:9/w_2400,h_1350,c_limit/NFTs-Don't-Work-They-Way-You-Think-Gear-1239020052.jpg" alt="Slideshow" />
        <div className={HomePageStyles.textOverlay}>
          <h2>Universal MarketSquare</h2>
          <h3>Empowering the Web3 Community</h3>
        </div>
        <button className={HomePageStyles.buttonOverlay} onClick={handleExploreProducts}>
          Explore Products
        </button>
      </div>
      {products  && (
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
      )}
      <div className={HomePageStyles.footer}>
             <h2>© 2022 - 2023 Qwert Asdf, Yui</h2> 
      </div>
    </>
  );
};

export default HomePage;
