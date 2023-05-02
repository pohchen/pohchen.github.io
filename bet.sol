// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleInvestment {
    address payable public owner;
    mapping(address => uint256) public investments;

    constructor() {
        owner = payable(msg.sender);
    }

    function invest() public payable {
        investments[msg.sender] += msg.value;
    }

    function checkInvestment() public view returns (uint256) {
        return investments[msg.sender];
    }

    function withdraw() public {
        require(msg.sender == owner, "Only the contract owner can withdraw.");
        owner.transfer(address(this).balance);
    }
}
