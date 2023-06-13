const Transaction = require('../models/transaction');


const saveTransaction = async(req, res) => {
    console.log("uslo je u saveTransaction");
    const { transactionHash, transactionUrl, fromAddress, toAddress, user_address } = req.body;
    const transaction = new Transaction({
        hash: transactionHash,
        url: transactionUrl,
        from: fromAddress,
        to: toAddress,
        user_address
    })
    try {
        const savedTransaction = await transaction.save();
        return res.status(200).json(savedTransaction);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Unable to save transaction" });
    }

}


const getUserTransactions = async (req, res) => {
    console.log("getusertransactionssss");
    try {
        console.log("addressa: ", req.query.user_address);
        const transactions = await Transaction.find({ user_address: (req.query.user_address).toLowerCase() });
        console.log("transactions: ", transactions);
        return res.status(200).json(transactions);
    }
    catch (err) {
        console.log(err);
        return res.status(501).json(null);
    }
}

exports.saveTransaction = saveTransaction;
exports.getUserTransactions = getUserTransactions;