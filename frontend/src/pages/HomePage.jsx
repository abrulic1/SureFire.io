import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Card from '../components/Card/Card';
import HomePageStyles from './HomePage.module.css';

const HomePage = () => {
    const [response, setResponse] = useState([]);

    useEffect(() => {
        const fetchFun = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/products/`);
                const data = await res.json();
                setResponse(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchFun();
    }, []);

    return (
        <>
            <Header />
            <div className={HomePageStyles.products}>
                {response.map(product => (
                    <Card key={product._id} image={product.image} price={product.price} />
                ))}
            </div>
        </>
    )
};


export default HomePage;
