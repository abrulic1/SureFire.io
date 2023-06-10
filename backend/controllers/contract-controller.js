const { contractABI, contractBytecode } = require("../utils/contract-artifacts");

const getContractArtifacts = async (req, res) => {
    const contractArtifacts = {
        contractABI,
        contractBytecode
    };

    res.json(contractArtifacts);
}



exports.getContractArtifacts = getContractArtifacts;