import React from "react";
import MyShopStyles from "./MyShop.module.css";
import Header from '../Header/Header';
import Card from '../Card/Card';
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { deploySmartContract, getContractByUser } from "../../services/contract-service";
import { getProductsByOwnerAddress } from "../../services/user_products-service";

const MyShop = () => {
    const navigate = useNavigate();

    const createShopHandler = async () => {
        alert("Confirm deploying smart contract on Ethereum Blockchain");
        await deploySmartContract();
    }

    const { data: contract, isSuccess } = useQuery("contract", () => getContractByUser(localStorage.getItem("account")));
    const { data: products } = useQuery("products", () => getProductsByOwnerAddress(localStorage.getItem("account")));
    return (
        <>
            <Header />
            <div className={MyShopStyles.collections}>
                <h1>Your items</h1>
                <div className={MyShopStyles["collections-cards"]}>
                    {products && products.length > 0 ? (
                        <React.Fragment>
                            {products.map((product) => (
                                <Card
                                    key={product._id}
                                    image={`data:image/png;base64,${product.image}`}
                                    price={product.price}
                                    onClick={() => navigate(`/product?id=${product._id}`)}
                                />
                            ))}
                        </React.Fragment>
                    ) : (
                        <div className={MyShopStyles["not-found-div"]}>
                            <div className={MyShopStyles["products-not-found"]}>
                                <h1>No products found</h1>
                            </div>
                            {console.log("CONTRACT: ", contract)}
                            {contract !== undefined && contract && isSuccess ?
                                (
                                    <div className={MyShopStyles.buttons}>
                                        <button onClick={() => navigate('/additem')}>Add item</button>
                                    </div>) :
                                (
                                    <div className={MyShopStyles.buttons}>
                                        <button onClick={() => createShopHandler()}>Create shop</button>
                                    </div>
                                )
                            }
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