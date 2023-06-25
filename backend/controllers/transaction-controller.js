const Transaction = require('../models/transaction');


const saveTransaction = async(req, res) => {
    console.log("uslo je u saveTransaction");
    const { transactionHash, transactionUrl, fromAddress, toAddress, user_address, user_info } = req.body;
    const transaction = new Transaction({
        hash: transactionHash,
        url: transactionUrl,
        from: fromAddress,
        to: toAddress,
        user_address,
        user_info
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
    try {
        const transactions = await Transaction.find({ user_address: (req.query.user_address).toLowerCase() });
        return res.status(200).json(transactions);
    }
    catch (err) {
        console.log(err);
        return res.status(501).json(null);
    }
}

const getToContractTransactionsForOwner = async (req, res) => {
    try {
        console.log("contract address: ", req.query.contract_address);
        const transactions = await Transaction.find({ to: (req.query.contract_address).toLowerCase(), affirmed: false });
        console.log("transakcije upucene trenutno prijavljenom korisniku: ", transactions);
        return res.status(200).json(transactions);
    }
    catch (err) {
        console.log(err);
        return res.status(501).json(null);
    }
}


const affirmTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        transaction.affirmed = true;
        await transaction.save();
        res.status(200).json(transaction);
    }
    catch (error) {
        console.log(error);
    }
}
exports.saveTransaction = saveTransaction;
exports.getUserTransactions = getUserTransactions;
exports.getToContractTransactionsForOwner = getToContractTransactionsForOwner;
exports.affirmTransaction = affirmTransaction;