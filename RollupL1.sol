// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract RollupL1 is Ownable {
    bytes32 public currentStateRoot;
    uint256 public lastBatchId;

    event BatchCommitted(uint256 indexed batchId, bytes32 newStateRoot);
    event ProofVerified(uint256 indexed batchId);

    constructor(bytes32 _initialRoot) Ownable(msg.sender) {
        currentStateRoot = _initialRoot;
    }

    /**
     * @dev Sequencer submits the new state root and compressed transaction data
     */
    function commitBatch(uint256 _batchId, bytes32 _newStateRoot, bytes calldata _txData) external onlyOwner {
        require(_batchId == lastBatchId + 1, "Invalid batch ID");
        
        // In a real rollup, _txData is stored as calldata (L1 DA)
        emit BatchCommitted(_batchId, _newStateRoot);
    }

    /**
     * @dev Proof is submitted to finalize the batch
     */
    function verifyBatch(uint256 _batchId, bytes calldata _proof) external {
        // Verification logic (calling a ZK-Verifier) would go here
        lastBatchId = _batchId;
        emit ProofVerified(_batchId);
    }
}
