# ZK-Rollup Sequencer Lite

This repository provides an expert-level blueprint for a ZK-Rollup Sequencer. It focuses on the off-chain aggregation of transactions into batches and the subsequent update of the state root on the Ethereum Mainnet (L1).

### Rollup Workflow
1. **Batching:** The sequencer collects off-chain transactions and organizes them into a block.
2. **State Transition:** The sequencer computes the new state root based on the transaction execution.
3. **Commitment:** The new state root and transaction data (calldata) are submitted to the L1 Rollup contract.
4. **Verification:** A ZK-SNARK proof is submitted to prove the validity of the state transition.

### Key Features
* **Flat Structure:** All logic from L1 contracts to off-chain sequencer scripts is in the root.
* **Compressed Data:** Demonstrates how transaction data is packed to minimize L1 gas costs.
* **Security:** Ensures that the L1 state can only be updated with a valid cryptographic proof.
