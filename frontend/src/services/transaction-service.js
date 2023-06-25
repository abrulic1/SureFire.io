import { BE_URL } from "../utils/constants";
import { getContractByUser } from "./contract-service";
import { getUserByAddress } from "./user-service";

export const saveTransactionDetails = async (transactionHash, transactionUrl, fromAddress, toAddress, user_address, user_info) => {
    try {
        const request = {
            transactionHash,
            transactionUrl,
            fromAddress,
            toAddress,
            user_address,
            user_info
        }
        const res = await fetch(
            `${BE_URL}/transactions/save-transaction`,
            {
                method: 'POST', 
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                  }
            }
          );
          const data = await res.json();
          return data;
    } catch (error) {
    console.log(error);
    }
}


export const getUserTransactions = async (accountAddress) => {
    try {
        const response = await fetch(`${BE_URL}/transactions/user-transactions?user_address=${encodeURIComponent(accountAddress)}`);
        const res = await response.json();
        return res;
    } catch (err) {
        console.log("Greska kad se fetchaju transakcije");
        console.log(err);
    }
}


export const getToContractTransactionsForOwner = async (userAddress) => {
    try {
        const contract = await getContractByUser(userAddress);
        const response = await fetch(`${BE_URL}/transactions/transactions?contract_address=${encodeURIComponent(contract.address)}`);
        const res = await response.json();
        return res;
    } catch (err) {
        console.log("Greska kad se fetchaju transakcije za ownera kontrakta kojem je upucena transakcija");
        console.log(err);
    }
}

export const affirmTransactionInDB = async (transactionId) => {
    try {
        const res = await fetch(
            `${BE_URL}/transactions/affirm-transaction/${encodeURIComponent(transactionId)}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  }
            }
          );
          const data = await res.json();
          return data;
    } catch (error) {
    console.log(error);
    }
}