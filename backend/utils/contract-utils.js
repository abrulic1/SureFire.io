const Contract = require('../models/contract');


const getByOwner = async (owner) => {
    try {
        const contract = await Contract.findOne({ owner });
        return contract;
    }
    catch (err) {
        console.log("Unable to get contract by owner from db");
        console.error(err);
    }
}


exports.getByOwner = getByOwner;