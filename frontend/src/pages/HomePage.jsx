import React from "react";
import Header from "../components/Header/Header";
import Card from "../components/Card/Card";
import HomePageStyles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../services/product-service";
import { useQuery } from "react-query";

const HomePage = () => {
  const navigate = useNavigate();
  const {
    isError,
    isLoading,
    data: products,
  } = useQuery(["products"], fetchProducts, { staleTime: 6000 });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <>
      <Header sendDataToParent={() => {}} />
      {products && (
        <div className={HomePageStyles.products}>
          {products.map((product) => (
            <Card
              key={product._id}
              image={product.image}
              price={product.price}
              onClick={() => navigate(`/product?id=${product._id}`)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default HomePage;
