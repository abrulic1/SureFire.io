const { contractABI, contractBytecode } = require("../utils/contract-artifacts");
const Contract = require('../models/contract');

const getContractArtifacts = async (req, res) => {
    const contractArtifacts = {
        contractABI,
        contractBytecode
    };

    res.json(contractArtifacts);
}

const addContract = async (req, res) => {
    try {
        const { address, abi, bytecode, owner } = req.body;
        const contract = new Contract({
            address,
            abi,
            bytecode,
            user_id: owner
        });

        contract.save();
        res.status(200).json({ success: true, message: 'Contract added successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to add contract. Check console for more information' });
    }
}


const getContractByUser = async (req, res) => {
    const contract = await Contract.findOne({ user_id: req.query.user_id });
    if (contract)
        res.status(200).send(contract);
    else
        res.status(404).json({ success: false, message: 'Contract for this user not found' });

}



exports.getContractArtifacts = getContractArtifacts;
exports.addContract = addContract;
exports.getContractByUser = getContractByUser;