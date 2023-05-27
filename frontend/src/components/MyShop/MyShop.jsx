import React from "react";
import MyShopStyles from "./MyShop.module.css";
import Header from '../Header/Header';
import Card from '../Card/Card';
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getProductsByOwnerAddress } from "../../services/product-service";

const MyShop = () => {
    const navigate = useNavigate();

    const { data: products, isLoading, isError } = useQuery("products", () => getProductsByOwnerAddress(localStorage.getItem("accountAddress")));
  
    if (isLoading) {
        return <p>Loading...</p>;
    }
  
    if (isError) {
        return <p>Error while fetching products</p>;
    }
  
    return (
        <>
            <div className={MyShopStyles.collections}>
                <h1>Your items</h1>
                <div className={MyShopStyles["collections-cards"]}>
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <Card key={product.id} onClick={() => navigate(`/itemid/${product.id}`)} />
                        ))
                    ) : (
                            <div className={MyShopStyles["products-not-found"]}>
                                <h1>No products found</h1>
                            </div>
                    )}
                </div>
                <div className={MyShopStyles.buttons}>
                    <button onClick={() => navigate('/additem')}>Add item</button>
                </div>
            </div>
        </>
    );
}
  export default MyShop;