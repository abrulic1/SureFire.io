import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Card from '../components/Card/Card';
import HomePageStyles from './HomePage.module.css';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../services/product-service';
import { QueryClient, useQuery } from 'react-query';
const queryClient = new QueryClient();


const HomePage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const { isError, isSuccess, isLoading, data, error } = useQuery(["products"], fetchProducts, { staleTime: 6000 });

    useEffect(() => {
        console.log("Component rendering...");
        setProducts(data);
        // You can directly use the data returned from useQuery
        if (isSuccess) {
          console.log("Products:", data);
        }
      }, [isSuccess, data]);

    if (isLoading)
    {
        console.log("Loading...")
     return (<div>Loading...</div>)   
    }

    if (isError)
    {
        console.log("Error...")
     return <div>Error...</div>   
    }
    const handleDataFromChild = (newData) => {
        setProducts(newData);
    };
    
    return (
        <>
            <Header sendDataToParent={handleDataFromChild} />
            {products && (
                <div className={HomePageStyles.products}>
                    {products.map(product => (
                        <Card key={product._id} image={product.image} price={product.price} onClick={() => navigate(`/product?id=${product._id}`)} />
                    ))}
                </div>)}
        </>
    )
};


export default HomePage;
