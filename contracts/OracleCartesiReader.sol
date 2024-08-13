// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/utils/Strings.sol";

interface IInputBox {
    function addInput(address _dapp, bytes calldata _input) external returns (bytes32);
}

interface IChronicle {
    function readWithAge() external view returns (uint256 value, uint256 age);
}

interface ISelfKisser {
    function selfKiss(address oracle) external;
}

/// @title OracleCartesiReader
/// @notice This contract relays ETH/USD price from a Chronicle oracle to an InputBox
/// @dev This contract combines the functionality of oracle reading and price relaying
contract OracleCartesiReader {
    /// @notice The InputBox contract for adding inputs
    IInputBox public inputBox;

    /// @notice The Chronicle oracle contract for reading ETH/USD price
    IChronicle public chronicle;

    /// @notice The SelfKisser contract for whitelisting
    ISelfKisser public selfKisser;

    /// @notice Initializes the contract with necessary addresses
    /// @param _inputBoxAddress Address of the InputBox contract
    /// @param _chronicleAddress Address of the Chronicle oracle contract
    /// @param _selfKisserAddress Address of the SelfKisser contract
    constructor(
        address _inputBoxAddress,
        address _chronicleAddress,
        address _selfKisserAddress
    ) {
        inputBox = IInputBox(_inputBoxAddress);
        chronicle = IChronicle(_chronicleAddress);
        selfKisser = ISelfKisser(_selfKisserAddress);
        
        // Add this contract to the chronicle oracle's whitelist
        selfKisser.selfKiss(address(chronicle));
    }

    /// @notice Reads the current ETH/USD price and its age from the Chronicle oracle
    /// @return val The current ETH/USD price
    /// @return age The age of the price data
    function read() public view returns (uint256 val, uint256 age) {
        return chronicle.readWithAge();
    }

    
    /// @notice Relays the current ETH/USD price to the specified dApp address in JSON format
    /// @param _dappAddress The address of the dApp to receive the price data
    /// @return The bytes32 identifier of the added input
    /// @dev This function reads the price, formats it as JSON, and sends it to the InputBox
    function relayPrice(address _dappAddress) external returns (bytes32) {
        (uint256 price, uint256 age) = read();
        
        // Construct the JSON string
        string memory jsonString = string(abi.encodePacked(
            '{"ethUsdPrice":', 
            Strings.toString(price), 
            ',"timestamp":',
            Strings.toString(age),
            '}'
        ));
        
        // Add the input to the InputBox
        return inputBox.addInput(_dappAddress, bytes(jsonString));
    }
}