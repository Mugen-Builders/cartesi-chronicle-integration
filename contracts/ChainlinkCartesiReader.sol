// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

interface IInputBox {
    function addInput(address _dapp, bytes calldata _input) external returns (bytes32);
}

contract DataConsumerV3 {
    event PriceRelayed(address indexed dapp, uint256 price, uint256 age, bytes32 inputId);
    
  AggregatorV3Interface internal dataFeed;

    /// @notice The InputBox contract for adding inputs
    IInputBox immutable public inputBox;

  /**
   * Network: Sepolia
   * Aggregator: ETH/USD
   * Address: 0x694AA1769357215DE4FAC081bf1f309aDC325306
   */
  constructor(
    address _inputBoxAddress
  ) {
    inputBox = IInputBox(_inputBoxAddress);
    dataFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
  }

  /**
   * Returns the latest answer.
   */
  function getChainlinkDataFeedLatestAnswer() public view returns (int256) {
    // prettier-ignore
    (
      /* uint80 roundId */
      ,
      int256 answer,
      /*uint256 startedAt*/
      ,
      /*uint256 updatedAt*/
      ,
      /*uint80 answeredInRound*/
    ) = dataFeed.latestRoundData();
    return answer;
  }

    /// @notice Relays the current ETH/USD price to the specified dApp address in JSON format
    /// @param _dappAddress The address of the dApp to receive the price data
    /// @return The bytes32 identifier of the added input
    /// @dev This function reads the price, formats it as JSON, and sends it to the InputBox
    function relayPrice(address _dappAddress) external returns (bytes32) {
        uint256 price = uint256(getChainlinkDataFeedLatestAnswer());
        uint256 age = block.timestamp;
        
        // Construct the JSON string
        string memory jsonString = string(abi.encodePacked(
            '{"ethUsdPrice":', 
            Strings.toString(price), 
            ',"timestamp":',
            Strings.toString(age),
            '}'
        ));
        
        // Add the input to the InputBox
        bytes32 inputId = inputBox.addInput(_dappAddress, bytes(jsonString));

        emit PriceRelayed(_dappAddress, price, age, inputId);

        return inputId;
    }
}
