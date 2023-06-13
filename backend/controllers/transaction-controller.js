const Transaction = require('../models/transaction');


const saveTransaction = async(req, res) => {
    console.log("uslo je u saveTransaction");
    const { transactionHash, transactionUrl, fromAddress, toAddress } = req.body;
    const transaction = new Transaction({
        hash: transactionHash,
        url: transactionUrl,
        from: fromAddress,
        to: toAddress
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


exports.saveTransaction = saveTransaction;