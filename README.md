<div align="center">
    <h1>Cartesi Chronicle Integration</h1>
    <i>Template for Chronicle Oracles</i>
</div>
<div align="center">
  Learn how to use chronicle oracles in combination with cartesi rollups.
</div>

<div align="center">
  
  <a href="">[![Static Badge](https://img.shields.io/badge/cartesi--rollups-1.5.0-5bd1d7)](https://docs.cartesi.io/cartesi-rollups/1.5/)</a>
  <a href="">[![Static Badge](https://img.shields.io/badge/chronicle-green)](https://chroniclelabs.org/B)</a>
</div>

Welcome to the **Cartesi Chronicle Integration** repository! This template is a starting point for integrating Chronicle oracles with Cartesi Rollups. In this tutorial, we'll walk you through setting up the backend and frontend for a decentralized application (dApp) that fetches data from Chronicle oracles and processes it using Cartesi Rollups.

## Repository Structure

-   **[backend](./backend/):** Contains the dApp backend. The template is a simple echo written in python.
-   **[frontend](./frontend/):** The React-based frontend that interacts with the Cartesi Rollups via the deployed smart contract.
-   **[contracts](./contracts/):** Solidity smart contracts for integrating Chronicle oracles and Cartesi InputBox.

## Index
1.  **Introduction to Cartesi**
2.  **Introduction to Chronicle**
3.  **Understanding Oracle Usage**
4.  **Deploying the Contracts**
5.  **Setting Up the Backend**
6.  **Mounting the Frontend**
7.  **Showcase: The dApp in Action**

----------

## 1. Introduction to Cartesi

**Cartesi** is a layer-2 solution that allows developers to run complex computations off-chain, leveraging a Linux environment to process data in a scalable and secure manner. By using Cartesi Rollups, you can offload heavy processing from the blockchain, ensuring that your dApps are both cost-effective and performant.

## 2. Introduction to Chronicle

**Chronicle** provides decentralized oracles that deliver secure, reliable, and immutable data feeds to smart contracts. In DeFi and other blockchain-based applications, oracles are essential for fetching external data, such as asset prices or weather conditions, used within smart contracts to execute logic based on real-world information.

## 3. Understanding Oracle Usage

Before diving into the code, it's important to understand how oracles work and how they are used within smart contracts:

-   **Oracle Basics:** Oracles act as a bridge between off-chain data and on-chain smart contracts, fetching data from the outside world and delivering it to the blockchain tamper-proof.
    
-   **Deploying to Sepolia:** Once you've tested your integration locally, you must deploy the contracts to a public testnet like Sepolia to feed real-time data into your dApp.

### 3.1 Architecture Overview

So the integration happens with the usage of the contracts/OracleCartesiReader.sol contract. It is responsible to integrate all the necessary to collect the data from the Chronicle Oracle and feed the InputBox contract which is responsible for receive the dApp inputs for Cartesi Aplications. 

![chronicle](https://github.com/user-attachments/assets/a97f8e91-6b18-4f2e-9b02-4596cc8a68a0)
  

## 4. Deploying the Contracts

### 4.1 Deploying through Remix

1.  **Open Remix:** Go to [Remix IDE](https://remix.ethereum.org/).
2.  **Create a New File:** In Remix, create a new Solidity file (`OracleCartesiReader.sol`), and paste the contract code from the `contracts` folder.
3.  **Compile the Contract:** Select the appropriate Solidity compiler version (e.g., 0.8.18) and compile the contract.
4.  **Deploy to Sepolia:**
    -   Connect your MetaMask wallet to Sepolia.
    -   Deploy the contract using Remix’s Deploy & Run module.
    -   Make a note of the deployed contract address; **you'll need it for the front end**.

### 4.2 Deploying the Backend

The contract (`OracleCartesiReader.sol`) is responsible for fetching data from the Chronicle oracle and sending it to Cartesi Rollups via the InputBox.

-   Follow the steps above to deploy this contract using Remix or your preferred method.
-   Follow the https://docs.cartesi.io/cartesi-rollups/1.5/deployment/introduction/ to deploy the code backend. You can either store the node in fly.io or run it locally. You will need it running when you run the frontend to send information.

## 6. Mounting the Frontend

1.  **Navigate to Frontend Directory:**
    
    `cd frontend` 
    
2.  **Install Frontend Dependencies:**
    
    `npm install` 
    
3.  **Update Contract Address:**
    
    -   In your frontend code, locate the part where the contract address is defined.
    -   Replace the placeholder address with the actual address of the deployed `OracleCartesiReader` contract on Sepolia.
4.  **Run the Frontend:** Start the frontend application.
    
    `npm run dev` 
    
    This will launch the React application that interacts with your deployed smart contract.
    

## 7. Showcase: The dApp in Action

Once everything is set up, navigate to your front-end application in the browser. Here's what you should be able to do:

-   **Submit Data:** Enter a string in the input field and submit it. The front end will send this string, along with data fetched from the Chronicle oracle, to the deployed smart contract.
    
-   **Data Processing:** The data is then processed by Cartesi Rollups, simulating complex off-chain computation.
    
-   **View Results:** After processing, view the results in your front end and verify that the integration between Chronicle Oracles and Cartesi Rollups functions correctly.
    

----------
