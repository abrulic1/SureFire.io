import { BE_URL } from "../utils/constants";

export const saveTransactionDetails = async (transactionHash, transactionUrl, fromAddress, toAddress) => {
    try {
        const request = {
            transactionHash,
            transactionUrl,
            fromAddress,
            toAddress
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