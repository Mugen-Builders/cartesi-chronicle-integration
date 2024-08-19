# Deploying the Contracts

Follow these steps to deploy the Oracle Cartesi Reader contract using Remix IDE:

1. **Access Remix IDE**
   - Navigate to [Remix IDE](https://remix.ethereum.org/) in your web browser.

2. **Create Contract File**
   - In Remix, create a new Solidity file named `OracleCartesiReader.sol`.
   - Copy and paste the contract code from the [`contracts/OracleCartesiReader.sol`](./OracleCartesiReader.sol) folder into this file.

3. **Compile the Contract**
   - Select the appropriate Solidity compiler version (e.g., 0.8.26).
   - Compile the contract using Remix's compilation feature.

4. **Deploy to Sepolia Testnet**
   - Ensure your MetaMask wallet is connected to the Sepolia testnet.
   - Use Remix's "Deploy & Run Transactions" module to deploy the contract.
   - **Important:** Make a note of the deployed contract address. You will need this for frontend integration.

> Note: Ensure you have sufficient Sepolia ETH in your wallet for deployment gas fees.