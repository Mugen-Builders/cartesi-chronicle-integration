// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

  /// @notice Interface mínima para interagir com o InputBox existente.
interface IInputBox {
    function addInput(address appContract, bytes calldata payload) external returns (bytes32);
}

// Copied from [chronicle-std](https://github.com/chronicleprotocol/chronicle-std/blob/main/src/IChronicle.sol).
interface IChronicle {
    /// @notice Retorna o valor atual do Oracle.
    /// @dev Reverte se nenhum valor foi definido.
    /// @return value O valor atual do Oracle.
    function read() external view returns (uint256 value);
}

// Copied from [self-kisser](https://github.com/chronicleprotocol/self-kisser/blob/main/src/ISelfKisser.sol).
interface ISelfKisser {
    /// @notice Permite que o chamador tenha acesso ao oracle.
    function selfKiss(address oracle) external;
}

/// @title OracleReader com envio de dados para Cartesi InputBox
/// @notice Lê o valor do Oracle e envia, junto com uma string fornecida pelo usuário, para o InputBox da Cartesi.
contract OracleCartesiReader {
    /// @notice O contrato Chronicle ETH/USD oracle.
    IChronicle public immutable chronicle;

    /// @notice O contrato SelfKisser que concede acesso ao oracle.
    ISelfKisser public immutable selfKisser;

    /// @notice Endereço do contrato InputBox já implementado na blockchain.
    address public inputBoxAddress;

    /// @notice Evento emitido quando um novo dado é enviado para o Cartesi Rollups.
    event DataSentToCartesi(bytes32 indexed inputHash, uint256 value, string userString);

    /// @param chronicle_ Endereço do contrato Chronicle oracle.
    /// @param selfKisser_ Endereço do contrato SelfKisser.
    /// @param _inputBoxAddress Endereço do contrato InputBox já implementado.
    constructor(
        address chronicle_,
        address selfKisser_,
        address _inputBoxAddress    
        ) {
        chronicle = IChronicle(chronicle_);
        selfKisser = ISelfKisser(selfKisser_);
        inputBoxAddress = _inputBoxAddress;
        selfKisser.selfKiss(address(chronicle));
    }

    /// @notice Função para ler o dado do Oracle e enviar junto com uma string para o Cartesi InputBox.
    /// @param userString String enviada pelo usuário do frontend.
    /// @return inputHash O hash do input enviado ao InputBox.
    function readAndSendToCartesi(string calldata userString, address cartesiApp) external returns (bytes32 inputHash) {
        // Lê o valor do Oracle.
        uint256 oracleValue = chronicle.read();

        // Prepara o payload com o valor lido e a string do usuário.
        bytes memory payload = abi.encode(oracleValue, userString);

        // Interage com o InputBox já implementado usando seu endereço.
        IInputBox inputBox = IInputBox(inputBoxAddress);
        inputHash = inputBox.addInput(cartesiApp, payload);

        // Emite um evento com o hash do input, o valor do Oracle e a string do usuário.
        emit DataSentToCartesi(inputHash, oracleValue, userString);
    }

    /// @notice Função para atualizar o endereço do contrato InputBox, se necessário.
    /// @param _inputBoxAddress O novo endereço do contrato InputBox.
    function updateInputBoxAddress(address _inputBoxAddress) external {
        inputBoxAddress = _inputBoxAddress;
    }
}