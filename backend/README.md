# Deploying the Backend

The `OracleCartesiReader.sol` contract is responsible for fetching data from the Chronicle oracle and sending it to Cartesi Rollups via the InputBox.

1. **Deploy the Contract**
   - Follow [the steps here to deploy the `OracleCartesiReader.sol` contract](../contracts/README.md) using Remix or your preferred method.

2. **Deploy the Backend Code**
   - Follow the instructions in the [Cartesi Rollups Deployment Guide](https://docs.cartesi.io/cartesi-rollups/1.5/deployment/introduction/).
   - You have two options for deploying the backend:
     a. Store the node in `fly.io`
     b. Run it locally
   
   > Note: The backend needs to be running when you operate the frontend to send information.

> Important: Make sure to keep your backend running and accessible for proper functionality of the entire system.