pragma solidity ^0.8.0;

contract Betting {
    mapping(address => uint256) public balances;
    address public owner = 0xfF2c5C74B24E7b6B5A7cd20E8803E5d89aBAd07D;

    function bet() public payable {
        require(msg.value > 0, "You need to bet something");
        balances[msg.sender] += msg.value;
    }

    function get() public {
        require(msg.sender == owner, "Only the owner can withdraw funds");
        payable(msg.sender).transfer(address(this).balance);
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}
