import React, { useState } from "react";
import { useParams, useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ItemStyles from './Item.module.css';
import { handleBuyNowClick } from './handleBuyNowClick';
import Header from '../Header/Header';
import { fetchProductById } from "../../services/product-service";
import { useQuery } from 'react-query';
import Button from "../Button/Button";

const Item = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const [showModal, setShowModal] = useState(false);
    const { isError, isSuccess, isLoading, data, error } = useQuery(["productById", id], () => fetchProductById(id), { staleTime: 60000 });


    const handleBuyNowButtonClick = () => {
        setShowModal(true);
    }

    const handleModalCloseClick = () => {
        setShowModal(false);
    }

    return (
        <div>
            <h1 style={{marginTop: '2vw'}}>PRODUCT DETAILS</h1>
            {data && (
                <div className={ItemStyles.content}>
                    <div className={ItemStyles.image}>
                        <img src={data.image}></img>
                    </div>
                    <div className={ItemStyles.details}>
                        <h2>{data.name}</h2>
                        <h3>Owned by: {data.owner}</h3>
                        <div className={ItemStyles.price}>
                            <h3>Current Price</h3>
                            <h2>{data.price} ETH</h2>
                            <div className={ItemStyles.buttons}>
                                <Button mode="dark" onClick={handleBuyNowButtonClick} text="Buy now" style={{ margin: '0px', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }} />
                                <Button mode="dark" text="Cart" style={{
                                    margin: '0px', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px', borderLeft: '1px solid black'
                                }} />
                            </div>
                        </div>
                        <h2>Description</h2>
                        <h3>No description available</h3>
                    </div>
                </div>
            )}
            {showModal && (
                <div className={ItemStyles.modal}>
                    <div className={ItemStyles['modal-content']}>
                        <h1>This product will be added to your cart</h1>
                        <div>
                            <span>
                                <h2>product name:</h2>
                                <h2>{data.name}</h2>
                            </span>
                            <span>
                                <h2>owner:</h2>
                                <h2>{data.owner}</h2>
                            </span>
                            <span>
                                <h2>description:</h2>
                                <h2>No description available</h2>
                            </span>
                            <span>
                                <h2>contract:</h2>
                                <h2>{data.owner}</h2>
                            </span>
                            <span className={ItemStyles['span-price']}>
                                <h2>price:</h2>
                                <h2>{data.price} ETH</h2>
                            </span>
                            <span>
                                <h2>amount:</h2>
                                <h2>1</h2>
                            </span>
                        </div>
                        <div className={ItemStyles.modalButtons}>
                            <Button mode="dark" onClick={handleModalCloseClick} text="No" />
                            <Button onClick={() => {
                                handleBuyNowClick(data.owner, id);
                                handleModalCloseClick();
                            }} text="Yes" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Item;
