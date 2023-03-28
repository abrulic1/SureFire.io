// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract Payment {
    address payable public seller;
    address payable public buyer;
    uint public amount;
    bool public paid;

    constructor(address payable _seller, address payable _buyer, uint _amount) {
        seller = _seller;
        buyer = _buyer;
        amount = _amount;
    }

    function makePayment() public payable {
        require(msg.sender == buyer, "Only buyer can call this function");
        require(msg.value == amount, "Payment amount should be equal to the order amount");
        require(!paid, "Payment has already been made");

        seller.transfer(amount);
        paid = true;
    }

    function refundPayment() public {
        require(msg.sender == seller, "Only seller can call this function");
        require(paid, "Payment has not been made yet");

        payable(msg.sender).transfer(amount);
        paid = false;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
