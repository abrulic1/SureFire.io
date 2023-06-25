import React from "react";
import { useQuery } from "react-query";
import ProfileStyles from "./Profile.module.css";
import ProfileIcon from "./profile.png";
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import { accountAddress } from "./getAccountAddress";
import { accountBalance } from "./getAccountBalance";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { getUserTransactions } from "../../services/transaction-service";

const Profile = () => {
  const navigate = useNavigate();

  const { data: transactions } = useQuery('transactions', () => getUserTransactions(localStorage.getItem('account')), { staleTime: 6000 });

  return (
    <>
      <Header />
      <div className={ProfileStyles["profile-card"]}>
        <div className={ProfileStyles.info}>
          <h2>
            Accout address: {localStorage.getItem("account")}
          </h2>
          <h2>
            Balance: {localStorage.getItem("balance")} ETH
          </h2>
          <br></br>
          <hr />
          <br></br>
          <div>
            {console.log("transactions: ", transactions)}
            {transactions != null && transactions != 'undefined' && transactions.length > 0 ?
              <>
              <h2>Purchased products</h2>
                {transactions.map(t => {
                  return <a href={t.url} target="_blank" rel="noopener noreferrer">{t.url}</a>
                })}
                </> :
              <h2>You don't have any purchased product</h2>
          }
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
