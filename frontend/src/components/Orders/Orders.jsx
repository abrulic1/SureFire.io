import React from 'react';
import { useQuery } from 'react-query';
import { affirmTransactionInDB, getToContractTransactionsForOwner } from '../../services/transaction-service';
import OrderStyles from './Orders.module.css';
import Header from '../Header/Header';

const Orders = () => {
  const { data: ordersForUser } = useQuery("ordersForUser", () =>
    getToContractTransactionsForOwner(localStorage.getItem("account"))
  );

    const sendEmail = (emailAddress) => {
        const message = 'Dear Madam/Sir,\n\nProduct You ordered is successfully sent to Your address. This is automatically mail, please don\'t reply.\n\n\nBest Regards';
    const subject = encodeURIComponent('SureFire.io product purchase');
      const body = encodeURIComponent(`${message}`);

    const mailtoLink = `mailto:${emailAddress}?subject=${subject}&body=${body}`;

        window.location.href = mailtoLink;
  
    };

  const affirmTransaction = async (transactionId, email) => {
    sendEmail(email);
    affirmTransactionInDB(transactionId);
  }
  return (
    <>
      <Header />
      {ordersForUser && ordersForUser.length>0 ? ordersForUser.map((t) => (
        <div className={OrderStyles.order} key={t.id}>
          <div className={OrderStyles.buyerDetails}>
            <h1>Buyer details:</h1>
            <h2>Name: {t.user_info.name} {t.user_info.surname}</h2>
            <h2>Address: {t.user_info.address}</h2>
            <h2>Email: {t.user_info.email}</h2>
            <h2>Ethereum address: {t.from}</h2>
            <h2>Transaction url: <a href={t.url} target="_blank" rel="noopener noreferrer">Check here</a></h2>
          </div>
              <div className={OrderStyles.options}>
              <button onClick={() => affirmTransaction(t._id, `${t.user_info.email}`)}>Send order</button>
          </div>
        </div>
      )) : <h2 className={OrderStyles.noOrders}>That's all. Have a nice day!</h2>}
    </>
  );
};

export default Orders;
