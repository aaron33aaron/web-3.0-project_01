// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount;

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    // outlining properties of transfer structure
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    // defining transactions variable of array of transactions of type TransferStruct
    TransferStruct[] transactions;

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
        transactionCount += 1;
        // pushing trasnsaction sturct into transsaction array
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

        // emit Transfer event
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    // this function returns TransferStruct array which is array of objects
    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;   
    }

    // this function returns transaction count
    function getTransactionCount() public view returns (uint256) {
         return transactionCount;
    }
}