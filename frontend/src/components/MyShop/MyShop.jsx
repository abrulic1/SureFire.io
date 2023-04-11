import React from "react";
import MyShopStyles from "./MyShop.module.css";
import Header from '../Header/Header';
import Card from '../Card/Card';
import { useNavigate } from "react-router-dom";
const MyShop = () => {
    const navigate = useNavigate();
    return (

        <>
        <Header />
        <div className={MyShopStyles.collections}>
            {/* Ovdje moram pokupit podatke i u slucaju da nema vec svoj shop sa proizvodima
                   da bude dodano dugme da se kreira u pozadini smart contract,
                   a ako ima da se prikazu svi proizvodi i dugme za dodavanje novih
                Za svaki proizvod cu morat dodat dalje detaljan prikaz    */}
            <h1>Your items</h1>
            <div className={MyShopStyles['collections-cards']}>
                <Card onClick={() => navigate('/itemid')}/>
                <Card onClick={() => navigate('/itemid')}/>
                <Card onClick={() => navigate('/itemid')}/>
            </div>
            <div className={MyShopStyles.buttons}>
                <button onClick={() => navigate('/additem')}>Add new item</button>
            </div>
        </div>
        </>
    )
}

export default MyShop;