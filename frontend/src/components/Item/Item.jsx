import React, { useState } from "react";
import { useParams, useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
import ItemStyles from './Item.module.css';
import { handleBuyNowClick } from './handleBuyNowClick';
import Header from '../Header/Header';
const Item = () => {
    console.log("KOMONENTA SE RENDERUJE");
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const [item, setItem] = useState(null);
    const [showModal, setShowModal] = useState(false); // Add state for modal visibility

    useEffect(() => {
        const fetchItem = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/products/${encodeURIComponent(id)}`);
            const data = await response.json();
            console.log("RESPONSE DATA ISsssssssssss: ", data);
            setItem(data);
        }
        fetchItem();
    }, []);

    const handleBuyNowButtonClick = () => {
        // Open the modal
        setShowModal(true);
    }

    const handleModalCloseClick = () => {
        // Close the modal
        setShowModal(false);
    }

    return (
        <div>
            <Header />
            <h1>PRODUCT DETAILS</h1>
            {item && (
                <div className={ItemStyles.content}>
                    <div className={ItemStyles.image}>
                        <img src={item.image}></img>
                    </div>
                    <div className={ItemStyles.details}>
                        <h2>{item.name}</h2>
                        <h3>Owned by: {item.owner}</h3>
                        <div className={ItemStyles.price}>
                            <h3>Current Price</h3>
                            <h2>{item.price} ETH</h2>
                            <div className={ItemStyles.buttons}>
                                <button onClick={handleBuyNowButtonClick(id, item.price, item.owner)}>Buy now</button>
                                <button>Cart</button>
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
                        <h2>Confirm purchase</h2>
                        <div>
                        <div>
                                <h2>Product:</h2>
                                <p>{item.name}</p>
                            </div>
                            <div>
                                <h2>Owned by:</h2>
                                <p>{item.owner}</p>
                            </div>
                            <div>
                                <h2>Product description:</h2>
                                <p>No description available</p>
                            </div>
                            <div>
                                <h2>Contract:</h2>
                                <p>{item.owner}</p>
                            </div>
                            <div>
                                <h2>Price:</h2>
                                <p>{item.price}</p>
                            </div>
                            <div>
                                <h2>Amount:</h2>
                                <p>1</p>
                            </div>
                        </div>
                        <div className={ItemStyles.modalButtons}>
                            {/* <button onClick={handleBuyNowClick(item.owner)}>Yes</button> */}
                            <button onClick={handleModalCloseClick}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Item;
