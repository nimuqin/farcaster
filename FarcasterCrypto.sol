// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract FarcasterCrypto is Ownable {
    string public chosenCrypto;
    mapping(address => string) public userCryptos;
    mapping(address => bool) public hasRecasted;

    event CryptoChosen(address indexed user, string crypto);
    event Recasted(address indexed user);

    constructor() Ownable(msg.sender) {}

    function chooseCrypto(string memory crypto) public {
        require(hasRecasted[msg.sender], "You need to recast first!");
        chosenCrypto = crypto;
        userCryptos[msg.sender] = crypto;
        emit CryptoChosen(msg.sender, crypto);
    }

    function recast() public {
        hasRecasted[msg.sender] = true;
        emit Recasted(msg.sender);
    }

    function getCrypto(address user) public view returns (string memory) {
        return userCryptos[user];
    }
}
