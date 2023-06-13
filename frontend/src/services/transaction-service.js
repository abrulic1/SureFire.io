import { BE_URL } from "../utils/constants";

export const saveTransactionDetails = async (transactionHash, transactionUrl, fromAddress, toAddress, user_address) => {
    try {
        const request = {
            transactionHash,
            transactionUrl,
            fromAddress,
            toAddress,
            user_address
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
        console.log("TTRRR: ", res);
        return res;
    } catch (err) {
        console.log("Greska kad se fetchaju transakcije");
        console.log(err);
    }
}