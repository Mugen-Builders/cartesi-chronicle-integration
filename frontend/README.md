# Mounting the Frontend

Follow these steps to set up and run the frontend application:

1. **Navigate to Frontend Directory**
   ```
   cd frontend
   ```

2. **Install Frontend Dependencies**
   ```
   npm install
   ```

3. **Update Contract Address**
   - In your frontend code, locate the part where the contract address is defined.
   - Replace the placeholder address with the actual address of the deployed `OracleCartesiReader` contract on Sepolia.

   > Important: Ensure you use the correct contract address to enable proper interaction between the frontend and the smart contract.

4. **Run the Frontend**
   ```
   npm run dev
   ```
   This command will launch the React application that interacts with your deployed smart contract.

> Note: Make sure your backend node is running before starting the frontend application for full functionality.