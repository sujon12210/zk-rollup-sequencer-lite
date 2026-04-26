const { ethers } = require("ethers");

class Sequencer {
    constructor(wallet, rollupAddress) {
        this.wallet = wallet;
        this.rollupAddress = rollupAddress;
        this.pendingTransactions = [];
    }

    addTransaction(tx) {
        this.pendingTransactions.push(tx);
        console.log(`Tx added to mempool: ${tx.hash}`);
    }

    async proposeBatch(batchId, newStateRoot) {
        const abi = ["function commitBatch(uint256, bytes32, bytes) external"];
        const contract = new ethers.Contract(this.rollupAddress, abi, this.wallet);

        // Compress pending txs into a single byte array
        const txData = ethers.hexlify(ethers.toUtf8Bytes(JSON.stringify(this.pendingTransactions)));
        
        console.log(`Proposing batch ${batchId}...`);
        const tx = await contract.commitBatch(batchId, newStateRoot, txData);
        await tx.wait();
        
        this.pendingTransactions = []; // Clear mempool
        return tx.hash;
    }
}

module.exports = { Sequencer };
