const { ethers } = require("ethers");

/**
 * Computes a mock state root for demonstration
 */
function computeStateRoot(transactions) {
    const data = JSON.stringify(transactions);
    return ethers.keccak256(ethers.toUtf8Bytes(data));
}

export { computeStateRoot };
